/**
 * AI Voice Studio - JavaScript Functionality
 * Handles 3D animations, text-to-speech conversion, and user interactions
 */

// Global Variables
let scene, camera, renderer, particles;
let selectedVoice = null;
let audioBlob = null;
let isGenerating = false;

// Application Configuration
const CONFIG = {
    maxCharacters: 5000,
    supportedLanguages: ['hi-IN', 'en-US', 'en-GB', 'en-AU'],
    apiEndpoint: 'tts-api.php',
    animationSpeed: 0.001,
    particleCount: 1000
};

// Voice Configuration with unique parameters
const VOICE_CONFIG = {
    'male-professional': {
        name: 'Professional Hindi Male',
        lang: 'hi-IN',
        rate: 0.9,
        pitch: 0.7,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Ravi - Hindi (India)', 'hi-IN-Standard-B']
    },
    'male-friendly': {
        name: 'Friendly Hindi Male',
        lang: 'hi-IN',
        rate: 1.0,
        pitch: 0.9,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Ravi - Hindi (India)', 'hi-IN-Standard-B']
    },
    'male-news': {
        name: 'News Anchor Hindi Male',
        lang: 'hi-IN',
        rate: 1.1,
        pitch: 0.8,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Ravi - Hindi (India)', 'hi-IN-News-D']
    },
    'male-calm': {
        name: 'Calm Hindi Male',
        lang: 'hi-IN',
        rate: 0.8,
        pitch: 0.6,
        volume: 0.9,
        voiceNames: ['Google हिन्दी', 'Microsoft Ravi - Hindi (India)', 'hi-IN-Standard-B']
    },
    'male-energetic': {
        name: 'Energetic Hindi Male',
        lang: 'hi-IN',
        rate: 1.3,
        pitch: 1.0,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Ravi - Hindi (India)', 'hi-IN-Standard-B']
    },
    'female-professional': {
        name: 'Professional Hindi Female',
        lang: 'hi-IN',
        rate: 0.9,
        pitch: 1.3,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi (India)', 'hi-IN-Standard-C']
    },
    'female-friendly': {
        name: 'Friendly Hindi Female',
        lang: 'hi-IN',
        rate: 1.0,
        pitch: 1.4,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi (India)', 'hi-IN-Standard-C']
    },
    'female-news': {
        name: 'News Anchor Hindi Female',
        lang: 'hi-IN',
        rate: 1.1,
        pitch: 1.2,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi (India)', 'hi-IN-News-E']
    },
    'female-calm': {
        name: 'Calm Hindi Female',
        lang: 'hi-IN',
        rate: 0.8,
        pitch: 1.1,
        volume: 0.9,
        voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi (India)', 'hi-IN-Standard-C']
    },
    'female-energetic': {
        name: 'Energetic Hindi Female',
        lang: 'hi-IN',
        rate: 1.3,
        pitch: 1.5,
        volume: 1.0,
        voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi (India)', 'hi-IN-Standard-C']
    }
};

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Load voices immediately and also when voices change
    if ('speechSynthesis' in window) {
        speechSynthesis.getVoices();
        speechSynthesis.addEventListener('voiceschanged', () => {
            console.log('Browser voices updated:', speechSynthesis.getVoices().length);
            console.log('Available voices:', speechSynthesis.getVoices().map(v => `${v.name} (${v.lang})`));
        });
    }
});

/**
 * Main application initialization
 */
function initializeApp() {
    console.log('🎙️ AI Voice Studio Initializing...');
    
    // Initialize Three.js 3D Background
    init3DBackground();
    
    // Initialize UI Components
    initializeUI();
    
    // Initialize Event Listeners
    initializeEventListeners();
    
    // Start real-time clock
    startClock();
    
    // Check browser compatibility
    checkBrowserSupport();
    
    console.log('✅ AI Voice Studio Ready!');
}

/**
 * Initialize Three.js 3D animated background
 */
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.001);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particle system
    createParticleSystem();
    
    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Add directional lighting
    const directionalLight = new THREE.DirectionalLight(0x6366f1, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Start animation loop
    animate3D();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

/**
 * Create particle system for 3D background
 */
function createParticleSystem() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < CONFIG.particleCount; i++) {
        // Random positions
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;
        
        vertices.push(x, y, z);
        
        // Random colors (blue and purple gradient)
        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.5 + Math.random() * 0.3);
        colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    // Create material
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    // Create particle system
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

/**
 * 3D animation loop
 */
function animate3D() {
    requestAnimationFrame(animate3D);
    
    // Rotate particle system
    if (particles) {
        particles.rotation.x += CONFIG.animationSpeed;
        particles.rotation.y += CONFIG.animationSpeed * 0.5;
        
        // Animate individual particles
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }
    
    // Render scene
    renderer.render(scene, camera);
}

/**
 * Handle window resize
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Initialize UI components
 */
function initializeUI() {
    // Initialize character counter
    updateCharacterCounter();
    
    // Initialize sliders
    initializeSliders();
    
    // Set default voice selection
    selectDefaultVoice();
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Text input events
    const textInput = document.getElementById('text-input');
    textInput.addEventListener('input', handleTextInput);
    textInput.addEventListener('paste', handleTextPaste);
    
    // Button events
    document.getElementById('clear-btn').addEventListener('click', clearText);
    document.getElementById('paste-btn').addEventListener('click', pasteText);
    document.getElementById('generate-btn').addEventListener('click', generateSpeech);
    document.getElementById('download-btn').addEventListener('click', downloadAudio);
    document.getElementById('share-btn').addEventListener('click', showShareModal);
    
    // Voice selection events
    document.querySelectorAll('.voice-option').forEach(option => {
        option.addEventListener('click', () => selectVoice(option));
    });
    
    // Slider events
    document.getElementById('speed-slider').addEventListener('input', updateSpeedDisplay);
    document.getElementById('pitch-slider').addEventListener('input', updatePitchDisplay);
    document.getElementById('volume-slider').addEventListener('input', updateVolumeDisplay);
    
    // Modal events
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('copy-link').addEventListener('click', copyShareLink);
    
    // Share button events
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => shareToSocial(btn.dataset.platform));
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle text input changes
 */
function handleTextInput() {
    updateCharacterCounter();
    validateTextInput();
}

/**
 * Handle text paste
 */
function handleTextPaste(e) {
    setTimeout(() => {
        updateCharacterCounter();
        validateTextInput();
    }, 100);
}

/**
 * Update character counter
 */
function updateCharacterCounter() {
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const currentLength = textInput.value.length;
    
    charCount.textContent = currentLength;
    
    // Update counter color based on length
    if (currentLength > CONFIG.maxCharacters * 0.9) {
        charCount.style.color = '#ef4444';
    } else if (currentLength > CONFIG.maxCharacters * 0.7) {
        charCount.style.color = '#f59e0b';
    } else {
        charCount.style.color = '#64748b';
    }
}

/**
 * Validate text input
 */
function validateTextInput() {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const text = textInput.value.trim();
    
    if (text.length === 0) {
        generateBtn.disabled = true;
        showToast('Please enter some text to convert', 'warning');
        return false;
    }
    
    if (text.length > CONFIG.maxCharacters) {
        generateBtn.disabled = true;
        showToast(`Text exceeds maximum limit of ${CONFIG.maxCharacters} characters`, 'error');
        return false;
    }
    
    if (!selectedVoice) {
        generateBtn.disabled = true;
        showToast('Please select a voice', 'warning');
        return false;
    }
    
    generateBtn.disabled = false;
    return true;
}

/**
 * Clear text input
 */
function clearText() {
    const textInput = document.getElementById('text-input');
    textInput.value = '';
    updateCharacterCounter();
    validateTextInput();
    showToast('Text cleared', 'success');
}

/**
 * Paste text from clipboard
 */
async function pasteText() {
    try {
        const text = await navigator.clipboard.readText();
        const textInput = document.getElementById('text-input');
        textInput.value = text;
        updateCharacterCounter();
        validateTextInput();
        showToast('Text pasted successfully', 'success');
    } catch (err) {
        showToast('Failed to paste text', 'error');
        console.error('Paste error:', err);
    }
}

/**
 * Select voice
 */
function selectVoice(option) {
    // Remove previous selection
    document.querySelectorAll('.voice-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selection to clicked option
    option.classList.add('selected');
    
    // Store selected voice with language
    selectedVoice = {
        id: option.dataset.voice,
        gender: option.dataset.gender,
        lang: option.dataset.lang || 'hi-IN',
        config: VOICE_CONFIG[option.dataset.voice]
    };
    
    // Validate input
    validateTextInput();
    
    // Show confirmation
    showToast(`Selected: ${selectedVoice.config.name}`, 'success');
}

/**
 * Select default voice
 */
function selectDefaultVoice() {
    const defaultOption = document.querySelector('[data-voice="female-professional"]');
    if (defaultOption) {
        selectVoice(defaultOption);
    }
}

/**
 * Initialize sliders
 */
function initializeSliders() {
    updateSpeedDisplay();
    updatePitchDisplay();
    updateVolumeDisplay();
}

/**
 * Update speed display
 */
function updateSpeedDisplay() {
    const slider = document.getElementById('speed-slider');
    const display = document.getElementById('speed-value');
    display.textContent = slider.value + 'x';
}

/**
 * Update pitch display
 */
function updatePitchDisplay() {
    const slider = document.getElementById('pitch-slider');
    const display = document.getElementById('pitch-value');
    display.textContent = slider.value;
}

/**
 * Update volume display
 */
function updateVolumeDisplay() {
    const slider = document.getElementById('volume-slider');
    const display = document.getElementById('volume-value');
    display.textContent = slider.value + '%';
}

/**
 * Generate speech
 */
async function generateSpeech() {
    if (!validateTextInput() || isGenerating) return;
    
    const text = document.getElementById('text-input').value.trim();
    const speed = parseFloat(document.getElementById('speed-slider').value);
    const pitch = parseFloat(document.getElementById('pitch-slider').value);
    const volume = parseFloat(document.getElementById('volume-slider').value) / 100;
    
    isGenerating = true;
    showLoading(true);
    
    try {
        // Try browser TTS first (most reliable)
        if ('speechSynthesis' in window) {
            const success = await useBrowserTTS(text, speed, pitch, volume);
            if (success) {
                showToast('Speech generated successfully!', 'success');
                return;
            }
        }
        
        // Fallback to API
        const success = await useAPITTS(text, speed, pitch, volume);
        if (success) {
            showToast('Speech generated successfully!', 'success');
        } else {
            throw new Error('All TTS methods failed');
        }
        
    } catch (error) {
        console.error('TTS Error:', error);
        showToast('Failed to generate speech. Please try again.', 'error');
        
        // Final fallback
        fallbackToBrowserTTS(text);
    } finally {
        isGenerating = false;
        showLoading(false);
    }
}

/**
 * Use browser Web Speech API with proper voice differentiation
 */
async function useBrowserTTS(text, speed, pitch, volume) {
    return new Promise((resolve) => {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Get voice configuration
        const voiceConfig = VOICE_CONFIG[selectedVoice.id];
        
        // Configure utterance with unique parameters
        utterance.rate = voiceConfig.rate * speed;
        utterance.pitch = voiceConfig.pitch * pitch;
        utterance.volume = voiceConfig.volume * volume;
        utterance.lang = voiceConfig.lang;
        
        // Get all available voices
        const voices = speechSynthesis.getVoices();
        let selectedBrowserVoice = null;
        
        // Find the best matching voice based on configuration
        if (selectedVoice && voiceConfig.voiceNames) {
            // Try to find exact voice match
            selectedBrowserVoice = voices.find(v => 
                voiceConfig.voiceNames.some(name => 
                    v.name.toLowerCase().includes(name.toLowerCase()) ||
                    v.lang.toLowerCase().includes(name.toLowerCase()) ||
                    v.voiceURI.toLowerCase().includes(name.toLowerCase())
                )
            );
            
            // If no exact match, try to find Hindi voice with gender characteristics
            if (!selectedBrowserVoice) {
                const hindiVoices = voices.filter(v => 
                    v.lang.includes('hi') || v.lang.includes('hin')
                );
                
                if (hindiVoices.length > 0) {
                    // For male voices, try to find male-sounding voices
                    if (selectedVoice.gender === 'male') {
                        selectedBrowserVoice = hindiVoices.find(v => 
                            v.name.toLowerCase().includes('male') ||
                            v.name.toLowerCase().includes('ravi') ||
                            v.name.toLowerCase().includes('teja') ||
                            v.name.toLowerCase().includes('standard-b')
                        );
                    }
                    // For female voices, try to find female-sounding voices
                    else if (selectedVoice.gender === 'female') {
                        selectedBrowserVoice = hindiVoices.find(v => 
                            v.name.toLowerCase().includes('female') ||
                            v.name.toLowerCase().includes('heera') ||
                            v.name.toLowerCase().includes('latha') ||
                            v.name.toLowerCase().includes('standard-c') ||
                            v.name.toLowerCase().includes('kalpana')
                        );
                    }
                    
                    // If still no match, use the first available Hindi voice
                    if (!selectedBrowserVoice) {
                        selectedBrowserVoice = hindiVoices[0];
                    }
                }
            }
        }
        
        // Final fallback to any available voice
        if (!selectedBrowserVoice) {
            selectedBrowserVoice = voices[0];
        }
        
        if (selectedBrowserVoice) {
            utterance.voice = selectedBrowserVoice;
            console.log(`Using voice: ${selectedBrowserVoice.name} (${selectedBrowserVoice.lang}) for ${selectedVoice.id}`);
            console.log(`Voice parameters - Rate: ${utterance.rate}, Pitch: ${utterance.pitch}, Volume: ${utterance.volume}`);
        }
        
        // Event handlers
        utterance.onstart = () => {
            console.log(`Started speaking with ${selectedVoice.id} voice`);
            // Show audio section
            const audioSection = document.getElementById('audio-section');
            audioSection.style.display = 'block';
            
            // Create a mock audio player for browser TTS
            setupBrowserAudioPlayer(utterance, text);
        };
        
        utterance.onend = () => {
            console.log(`Finished speaking with ${selectedVoice.id} voice`);
            resolve(true);
        };
        
        utterance.onerror = (event) => {
            console.error(`Speech error for ${selectedVoice.id}:`, event.error);
            resolve(false);
        };
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
        
        // Set timeout for resolution
        setTimeout(() => {
            if (window.speechSynthesis.speaking) {
                resolve(true); // Still speaking, consider it successful
            } else {
                resolve(false);
            }
        }, 1000);
    });
}

/**
 * Setup browser audio player
 */
function setupBrowserAudioPlayer(utterance, text) {
    const audioPlayer = document.getElementById('audio-player');
    const audioSection = document.getElementById('audio-section');
    
    // Create a simulated audio player for browser TTS
    audioPlayer.style.display = 'none';
    
    // Add browser TTS info
    const audioInfo = document.querySelector('.audio-details');
    if (audioInfo) {
        audioInfo.innerHTML = `
            <p><strong>Method:</strong> Browser Speech Synthesis</p>
            <p><strong>Duration:</strong> ~${Math.ceil(text.length * 0.1)} seconds</p>
            <p><strong>Format:</strong> Real-time playback</p>
            <p><strong>Voice:</strong> ${selectedVoice ? selectedVoice.config.name : 'Default'}</p>
        `;
    }
    
    // Update download button to use browser TTS
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.onclick = () => downloadBrowserTTS(text);
    
    // Show audio section
    audioSection.style.display = 'block';
}

/**
 * Download browser TTS audio
 */
async function downloadBrowserTTS(text) {
    try {
        // Use MediaRecorder API to capture browser TTS
        const audioStream = await captureBrowserTTS(text);
        if (audioStream) {
            downloadAudioFile(audioStream, 'browser-tts');
        } else {
            // Fallback: create a text file with instructions
            downloadTextFile(text);
        }
    } catch (error) {
        console.error('Download error:', error);
        downloadTextFile(text);
    }
}

/**
 * Capture browser TTS audio
 */
async function captureBrowserTTS(text) {
    return new Promise((resolve) => {
        // This is a simplified approach - in production, you'd use Web Audio API
        // For now, we'll create a placeholder
        resolve(null);
    });
}

/**
 * Download text file as fallback
 */
function downloadTextFile(text) {
    const content = `AI Voice Studio - Text Content\n\n${text}\n\nGenerated: ${new Date().toLocaleString()}\nVoice: ${selectedVoice ? selectedVoice.config.name : 'Default'}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-voice-text-${Date.now()}.txt`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showToast('Text content downloaded (audio recording not available in browser)', 'info');
}

/**
 * Use API TTS
 */
async function useAPITTS(text, speed, pitch, volume) {
    try {
        // Prepare request data
        const requestData = {
            text: text,
            voice: selectedVoice.id,
            speed: speed,
            pitch: pitch,
            volume: volume,
            language: selectedVoice.config.lang
        };
        
        // Call TTS API
        const response = await fetch(CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Get audio blob
        audioBlob = await response.blob();
        
        // Check if we got valid audio
        if (audioBlob.size < 1000) {
            throw new Error('Invalid audio data received');
        }
        
        // Create audio URL
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Setup audio player
        setupAudioPlayer(audioUrl);
        
        return true;
        
    } catch (error) {
        console.error('API TTS Error:', error);
        return false;
    }
}

/**
 * Fallback to browser Web Speech API
 */
function fallbackToBrowserTTS(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure utterance
        utterance.rate = parseFloat(document.getElementById('speed-slider').value);
        utterance.pitch = parseFloat(document.getElementById('pitch-slider').value);
        utterance.volume = parseFloat(document.getElementById('volume-slider').value) / 100;
        
        // Find matching voice
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.includes('en') && v.name.includes(selectedVoice.gender));
        if (voice) {
            utterance.voice = voice;
        }
        
        // Speak
        speechSynthesis.speak(utterance);
        
        showToast('Using browser speech synthesis', 'info');
    } else {
        showToast('Speech synthesis not supported in your browser', 'error');
    }
}

/**
 * Setup audio player
 */
function setupAudioPlayer(audioUrl) {
    const audioPlayer = document.getElementById('audio-player');
    const audioSection = document.getElementById('audio-section');
    
    // Set audio source
    audioPlayer.src = audioUrl;
    
    // Show audio section
    audioSection.style.display = 'block';
    
    // Update audio info
    updateAudioInfo();
    
    // Auto-play
    audioPlayer.play().catch(err => {
        console.log('Auto-play prevented:', err);
    });
}

/**
 * Update audio information
 */
function updateAudioInfo() {
    const audioPlayer = document.getElementById('audio-player');
    const durationDisplay = document.getElementById('audio-duration');
    const sizeDisplay = document.getElementById('audio-size');
    
    // Update duration
    audioPlayer.addEventListener('loadedmetadata', () => {
        const duration = audioPlayer.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        durationDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });
    
    // Update file size
    if (audioBlob) {
        const sizeInKB = (audioBlob.size / 1024).toFixed(1);
        const sizeInMB = (audioBlob.size / (1024 * 1024)).toFixed(2);
        sizeDisplay.textContent = sizeInKB > 1024 ? `${sizeInMB} MB` : `${sizeInKB} KB`;
    }
}

/**
 * Download audio file
 */
function downloadAudio() {
    if (audioBlob) {
        // API generated audio
        downloadAudioFile(audioBlob, 'api-tts');
    } else {
        // Browser TTS - download text file
        const text = document.getElementById('text-input').value.trim();
        downloadTextFile(text);
    }
}

/**
 * Download audio file helper
 */
function downloadAudioFile(blob, type) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    if (type === 'api-tts') {
        a.download = `ai-voice-${Date.now()}.mp3`;
    } else {
        a.download = `ai-voice-${Date.now()}.wav`;
    }
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Cleanup
    URL.revokeObjectURL(url);
    
    showToast('Audio downloaded successfully!', 'success');
}

/**
 * Show share modal
 */
function showShareModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'flex';
    
    // Generate share link (in real app, this would be a real URL)
    const shareLink = document.getElementById('share-link');
    shareLink.value = window.location.href;
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'none';
}

/**
 * Copy share link
 */
async function copyShareLink() {
    const shareLink = document.getElementById('share-link');
    
    try {
        await navigator.clipboard.writeText(shareLink.value);
        showToast('Link copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        shareLink.select();
        document.execCommand('copy');
        showToast('Link copied to clipboard!', 'success');
    }
}

/**
 * Share to social media
 */
function shareToSocial(platform) {
    const url = window.location.href;
    const text = 'Check out AI Voice Studio - Convert text to natural human voice!';
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + Enter to generate speech
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateSpeech();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + K to focus text input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('text-input').focus();
    }
}

/**
 * Show/hide loading spinner
 */
function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    const generateBtn = document.getElementById('generate-btn');
    
    if (show) {
        spinner.style.display = 'flex';
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    } else {
        spinner.style.display = 'none';
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Speech';
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon and color based on type
    toastIcon.className = '';
    switch (type) {
        case 'success':
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
            break;
        case 'error':
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = '#ef4444';
            break;
        case 'warning':
            toastIcon.className = 'fas fa-exclamation-triangle';
            toastIcon.style.color = '#f59e0b';
            break;
        case 'info':
            toastIcon.className = 'fas fa-info-circle';
            toastIcon.style.color = '#3b82f6';
            break;
    }
    
    // Show toast
    toast.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

/**
 * Start real-time clock
 */
function startClock() {
    const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('current-time').textContent = timeString;
    };
    
    updateTime();
    setInterval(updateTime, 1000);
}

/**
 * Check browser support
 */
function checkBrowserSupport() {
    const features = {
        'WebGL': () => {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        },
        'Web Speech API': () => 'speechSynthesis' in window,
        'Clipboard API': () => navigator.clipboard,
        'Fetch API': () => 'fetch' in window,
        'Audio API': () => 'Audio' in window
    };
    
    const unsupported = [];
    
    for (const [feature, test] of Object.entries(features)) {
        if (!test()) {
            unsupported.push(feature);
        }
    }
    
    if (unsupported.length > 0) {
        console.warn('Browser compatibility issues:', unsupported);
        showToast(`Some features may not work: ${unsupported.join(', ')}`, 'warning');
    }
    
    // Load voices for speech synthesis
    if ('speechSynthesis' in window) {
        speechSynthesis.getVoices();
        speechSynthesis.addEventListener('voiceschanged', () => {
            console.log('Available voices:', speechSynthesis.getVoices().length);
        });
    }
}

/**
 * Error handling
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    showToast('An unexpected error occurred', 'error');
});

/**
 * Performance monitoring
 */
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.duration > 100) {
            console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({entryTypes: ['measure', 'navigation']});
}

/**
 * Service Worker registration (for PWA support)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
