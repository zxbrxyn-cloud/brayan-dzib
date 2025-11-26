// Variables globales para el chatbot
const GEMINI_API_KEY = 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Reemplaza con tu API key de Google Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// DOM Elements
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotWidget = document.querySelector('.chatbot-widget');

// Estado del chatbot
let isChatbotOpen = false;
let isLoadingResponse = false;

// Event Listeners
chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isLoadingResponse) {
        sendMessage();
    }
});

/**
 * Abre o cierra el chatbot
 */
function toggleChatbot() {
    isChatbotOpen = !isChatbotOpen;
    
    if (isChatbotOpen) {
        chatbotWidget.classList.add('open');
        chatbotToggle.style.display = 'none';
        chatbotInput.focus();
    } else {
        chatbotWidget.classList.remove('open');
        chatbotToggle.style.display = 'flex';
    }
}

/**
 * Envía un mensaje al chatbot
 */
async function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (!message || isLoadingResponse) return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Mostrar indicador de escritura
    isLoadingResponse = true;
    showTypingIndicator();
    
    try {
        // Validar que la API key esté configurada
        if (GEMINI_API_KEY.includes('xxx')) {
            throw new Error('⚠️ Por favor, configura tu API key de Google Gemini en el archivo script.js');
        }
        
        // Llamar a Google Gemini
        const response = await callGeminiAPI(message);
        
        // Remover indicador de escritura
        removeTypingIndicator();
        
        // Agregar respuesta del bot
        addMessage(response, 'bot');
    } catch (error) {
        removeTypingIndicator();
        addMessage(`Error: ${error.message}`, 'error');
        console.error('Error en el chatbot:', error);
    } finally {
        isLoadingResponse = false;
    }
}

/**
 * Llama a la API de Google Gemini
 */
async function callGeminiAPI(userMessage) {
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: userMessage
                    }
                ]
            }
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
        },
        safetySettings: [
            {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
        ]
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Error al conectar con Google Gemini');
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Respuesta inválida de Google Gemini');
    }

    return data.candidates[0].content.parts[0].text;
}

/**
 * Agrega un mensaje al chat
 */
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Procesar markdown simple
    let processedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    
    contentDiv.innerHTML = `<p>${processedText}</p>`;
    messageDiv.appendChild(contentDiv);
    
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll automático al último mensaje
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Animación de entrada
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.3s ease-in';
    }, 0);
}

/**
 * Muestra el indicador de escritura
 */
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    typingDiv.id = 'typing-indicator';
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

/**
 * Remueve el indicador de escritura
 */
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Cerrar chatbot al hacer clic fuera (opcional)
document.addEventListener('click', (e) => {
    if (isChatbotOpen && 
        !chatbotContainer.contains(e.target) && 
        !e.target.closest('.chatbot-container')) {
        // Opcional: descomentar para cerrar al hacer clic fuera
        // toggleChatbot();
    }
});

// Script del navbar y otras funcionalidades existentes
document.addEventListener('DOMContentLoaded', () => {
    // Navbar functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scroll para los links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navMenu) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Mostrar/ocultar scroll indicator
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
});
