<?php
/**
 * AI Voice Studio - Configuration File
 * Contains all application settings and configurations
 */

// Prevent direct access
if (!defined('AI_VOICE_STUDIO') && basename($_SERVER['PHP_SELF']) === 'config.php') {
    header('HTTP/1.0 403 Forbidden');
    exit('Direct access to this file is not allowed.');
}

/**
 * Application Configuration
 */
function getAppConfig() {
    return [
        // Application Info
        'app_name' => 'AI Voice Studio',
        'app_version' => '1.0.0',
        'app_description' => 'Professional Text-to-Speech Converter with Natural Human Voices',
        
        // Environment Settings
        'environment' => 'development', // development, staging, production
        'debug_mode' => true,
        'timezone' => 'UTC',
        
        // Security Settings
        'security' => [
            'enable_csrf_protection' => true,
            'session_timeout' => 3600, // 1 hour
            'max_login_attempts' => 5,
            'password_min_length' => 8,
            'enable_rate_limiting' => true,
            'rate_limit_requests' => 100,
            'rate_limit_window' => 3600 // 1 hour
        ],
        
        // File Upload Settings
        'upload' => [
            'max_file_size' => 10 * 1024 * 1024, // 10MB
            'allowed_extensions' => ['txt', 'doc', 'docx'],
            'upload_path' => __DIR__ . '/uploads/',
            'temp_path' => __DIR__ . '/temp/'
        ],
        
        // Cache Settings
        'cache' => [
            'enable_cache' => true,
            'cache_duration' => 3600, // 1 hour
            'cache_path' => __DIR__ . '/cache/'
        ],
        
        // Logging Settings
        'logging' => [
            'enable_logging' => true,
            'log_level' => 'INFO', // DEBUG, INFO, WARNING, ERROR
            'log_path' => __DIR__ . '/logs/',
            'max_log_size' => 5 * 1024 * 1024, // 5MB
            'log_rotation' => true
        ]
    ];
}

/**
 * Text-to-Speech Configuration
 */
function getTTSConfig() {
    return [
        // TTS Engine Settings
        'max_text_length' => 5000,
        'min_text_length' => 1,
        'supported_languages' => ['hi-IN', 'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-IN'],
        
        // Voice Configurations
        'voices' => [
            'male-professional' => [
                'name' => 'Professional Hindi Male',
                'language' => 'hi-IN',
                'gender' => 'male',
                'age' => 'adult',
                'style' => 'professional',
                'google_voice_name' => 'hi-IN-Standard-B',
                'aws_voice_name' => 'Aditi',
                'description' => 'गंभीर, प्राधिकारिक टोन व्यावसायिक सामग्री के लिए उपयुक्त'
            ],
            'male-friendly' => [
                'name' => 'Friendly Hindi Male',
                'language' => 'hi-IN',
                'gender' => 'male',
                'age' => 'adult',
                'style' => 'friendly',
                'google_voice_name' => 'hi-IN-Standard-B',
                'aws_voice_name' => 'Aditi',
                'description' => 'गर्म, संवादात्मक टोन आकस्मिक सामग्री के लिए'
            ],
            'male-news' => [
                'name' => 'News Anchor Hindi Male',
                'language' => 'hi-IN',
                'gender' => 'male',
                'age' => 'adult',
                'style' => 'news',
                'google_voice_name' => 'hi-IN-News-D',
                'aws_voice_name' => 'Raveena',
                'description' => 'स्पष्ट, सुसंगत टोन समाचार और घोषणाओं के लिए'
            ],
            'male-calm' => [
                'name' => 'Calm Hindi Male',
                'language' => 'hi-IN',
                'gender' => 'male',
                'age' => 'adult',
                'style' => 'calm',
                'google_voice_name' => 'hi-IN-Standard-B',
                'aws_voice_name' => 'Aditi',
                'description' => 'शांत, शांत करने वाला टोन ध्यान और आराम के लिए'
            ],
            'male-energetic' => [
                'name' => 'Energetic Hindi Male',
                'language' => 'hi-IN',
                'gender' => 'male',
                'age' => 'adult',
                'style' => 'energetic',
                'google_voice_name' => 'hi-IN-Standard-B',
                'aws_voice_name' => 'Aditi',
                'description' => 'गतिशील, उत्साहजनक टोन विपणन सामग्री के लिए'
            ],
            'female-professional' => [
                'name' => 'Professional Hindi Female',
                'language' => 'hi-IN',
                'gender' => 'female',
                'age' => 'adult',
                'style' => 'professional',
                'google_voice_name' => 'hi-IN-Standard-C',
                'aws_voice_name' => 'Aditi',
                'description' => 'स्पष्ट, आत्मविश्वास से भरा टोन व्यावसायिक प्रस्तुतियों के लिए'
            ],
            'female-friendly' => [
                'name' => 'Friendly Hindi Female',
                'language' => 'hi-IN',
                'gender' => 'female',
                'age' => 'adult',
                'style' => 'friendly',
                'google_voice_name' => 'hi-IN-Standard-C',
                'aws_voice_name' => 'Aditi',
                'description' => 'गर्म, सुलभ टोन शैक्षणिक सामग्री के लिए'
            ],
            'female-news' => [
                'name' => 'News Anchor Hindi Female',
                'language' => 'hi-IN',
                'gender' => 'female',
                'age' => 'adult',
                'style' => 'news',
                'google_voice_name' => 'hi-IN-News-E',
                'aws_voice_name' => 'Raveena',
                'description' => 'पेशेवर, स्पष्ट टोन समाचार प्रसारण के लिए'
            ],
            'female-calm' => [
                'name' => 'Calm Hindi Female',
                'language' => 'hi-IN',
                'gender' => 'female',
                'age' => 'adult',
                'style' => 'calm',
                'google_voice_name' => 'hi-IN-Standard-C',
                'aws_voice_name' => 'Aditi',
                'description' => 'कोमल, शांत करने वाला टोन कल्याण सामग्री के लिए'
            ],
            'female-energetic' => [
                'name' => 'Energetic Hindi Female',
                'language' => 'hi-IN',
                'gender' => 'female',
                'age' => 'adult',
                'style' => 'energetic',
                'google_voice_name' => 'hi-IN-Standard-C',
                'aws_voice_name' => 'Aditi',
                'description' => 'उज्ज्वल, उत्साहजनक टोन प्रचार सामग्री के लिए'
            ]
        ],
        
        // Audio Settings
        'audio' => [
            'sample_rate' => 22050,
            'bit_rate' => 128000,
            'channels' => 1,
            'format' => 'mp3',
            'quality' => 'high'
        ],
        
        // API Settings
        'use_google_tts' => false, // Set to true and provide API key to use Google TTS
        'google_api_key' => '', // Add your Google Cloud TTS API key here
        'use_aws_polly' => false, // Set to true and provide credentials to use AWS Polly
        'aws_credentials' => [
            'key' => '',
            'secret' => '',
            'region' => 'us-east-1'
        ],
        
        // Rate Limiting
        'rate_limit' => [
            'requests_per_minute' => 60,
            'requests_per_hour' => 1000,
            'requests_per_day' => 10000,
            'characters_per_request' => 5000,
            'characters_per_day' => 50000
        ]
    ];
}

/**
 * Database Configuration (if needed in future)
 */
function getDatabaseConfig() {
    return [
        'host' => 'localhost',
        'port' => 3306,
        'database' => 'ai_voice_studio',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'options' => [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    ];
}

/**
 * Email Configuration (for notifications)
 */
function getEmailConfig() {
    return [
        'smtp_host' => 'smtp.gmail.com',
        'smtp_port' => 587,
        'smtp_username' => '',
        'smtp_password' => '',
        'smtp_encryption' => 'tls',
        'from_email' => 'noreply@aivoicestudio.com',
        'from_name' => 'AI Voice Studio',
        'reply_to' => 'support@aivoicestudio.com'
    ];
}

/**
 * Social Media Configuration
 */
function getSocialConfig() {
    return [
        'facebook' => [
            'app_id' => '',
            'app_secret' => '',
            'page_url' => 'https://facebook.com/aivoicestudio'
        ],
        'twitter' => [
            'api_key' => '',
            'api_secret' => '',
            'access_token' => '',
            'profile_url' => 'https://twitter.com/aivoicestudio'
        ],
        'linkedin' => [
            'client_id' => '',
            'client_secret' => '',
            'company_url' => 'https://linkedin.com/company/aivoicestudio'
        ],
        'instagram' => [
            'access_token' => '',
            'profile_url' => 'https://instagram.com/aivoicestudio'
        ]
    ];
}

/**
 * Analytics Configuration
 */
function getAnalyticsConfig() {
    return [
        'google_analytics' => [
            'tracking_id' => '', // Add your Google Analytics tracking ID
            'enable_tracking' => false
        ],
        'custom_analytics' => [
            'enable_tracking' => true,
            'track_page_views' => true,
            'track_tts_usage' => true,
            'track_voice_selection' => true,
            'track_errors' => true
        ]
    ];
}

/**
 * Performance Configuration
 */
function getPerformanceConfig() {
    return [
        'enable_compression' => true,
        'enable_caching' => true,
        'cache_ttl' => 3600,
        'minify_css' => true,
        'minify_js' => true,
        'lazy_load_images' => true,
        'cdn_enabled' => false,
        'cdn_url' => ''
    ];
}

/**
 * Feature Flags
 */
function getFeatureFlags() {
    return [
        'enable_user_accounts' => false,
        'enable_api_keys' => false,
        'enable_usage_limits' => false,
        'enable_billing' => false,
        'enable_social_sharing' => true,
        'enable_download_history' => false,
        'enable_voice_cloning' => false,
        'enable_batch_processing' => false,
        'enable_custom_voices' => false,
        'enable_ssdml_support' => false
    ];
}

/**
 * Error Handling Configuration
 */
function getErrorHandlingConfig() {
    return [
        'display_errors' => false,
        'log_errors' => true,
        'error_reporting_level' => E_ALL & ~E_DEPRECATED & ~E_STRICT,
        'send_error_emails' => false,
        'error_email_recipient' => 'admin@aivoicestudio.com'
    ];
}

/**
 * Initialize Configuration
 */
function initializeConfig() {
    // Set timezone
    $appConfig = getAppConfig();
    date_default_timezone_set($appConfig['timezone']);
    
    // Set error reporting
    $errorConfig = getErrorHandlingConfig();
    if ($appConfig['environment'] === 'development') {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
    } else {
        ini_set('display_errors', $errorConfig['display_errors'] ? 1 : 0);
        error_reporting($errorConfig['error_reporting_level']);
    }
    
    // Create necessary directories
    $directories = [
        $appConfig['upload']['upload_path'],
        $appConfig['upload']['temp_path'],
        $appConfig['cache']['cache_path'],
        $appConfig['logging']['log_path']
    ];
    
    foreach ($directories as $directory) {
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }
    }
}

// Auto-initialize configuration
if (!defined('CONFIG_INITIALIZED')) {
    initializeConfig();
    define('CONFIG_INITIALIZED', true);
}

/**
 * Get configuration value by key
 */
function getConfig($key, $default = null) {
    $config = getAppConfig();
    $keys = explode('.', $key);
    $value = $config;
    
    foreach ($keys as $k) {
        if (is_array($value) && isset($value[$k])) {
            $value = $value[$k];
        } else {
            return $default;
        }
    }
    
    return $value;
}

/**
 * Check if feature is enabled
 */
function isFeatureEnabled($feature) {
    $flags = getFeatureFlags();
    return isset($flags[$feature]) ? $flags[$feature] : false;
}

/**
 * Log configuration errors
 */
function logConfigError($message, $context = []) {
    $appConfig = getAppConfig();
    
    if ($appConfig['logging']['enable_logging']) {
        $logFile = $appConfig['logging']['log_path'] . 'config.log';
        $timestamp = date('Y-m-d H:i:s');
        $contextStr = !empty($context) ? json_encode($context) : '';
        $logMessage = "[{$timestamp}] CONFIG ERROR: {$message} {$contextStr}\n";
        
        error_log($logMessage, 3, $logFile);
    }
}

// Validate configuration on load
function validateConfiguration() {
    $errors = [];
    
    // Check required directories
    $appConfig = getAppConfig();
    $requiredDirs = [
        $appConfig['upload']['upload_path'],
        $appConfig['cache']['cache_path']
    ];
    
    foreach ($requiredDirs as $dir) {
        if (!is_dir($dir) || !is_writable($dir)) {
            $errors[] = "Directory not writable: {$dir}";
        }
    }
    
    // Check TTS configuration
    $ttsConfig = getTTSConfig();
    if (empty($ttsConfig['voices'])) {
        $errors[] = "No voices configured";
    }
    
    // Log errors if any
    if (!empty($errors)) {
        foreach ($errors as $error) {
            logConfigError($error);
        }
    }
    
    return empty($errors);
}

// Validate configuration on load
validateConfiguration();
?>
