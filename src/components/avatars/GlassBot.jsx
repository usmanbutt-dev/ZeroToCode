import React from 'react';

/**
 * GlassBot Avatar Component - Premium Edition
 * A cute, kawaii-style glass robot avatar with enhanced visuals
 * 
 * @param {string} variant - Avatar type
 * @param {number} size - Size in pixels (default: 64)
 * @param {boolean} animated - Enable animations (default: true)
 * @param {string} className - Additional CSS classes
 */
const GlassBot = ({ variant = 'standard', size = 64, animated = true, className = '' }) => {
  
  // Enhanced color schemes for each variant
  const themes = {
    standard: {
      primary: '#6366f1',
      secondary: '#818cf8',
      tertiary: '#a5b4fc',
      glow: '#c7d2fe',
      face: '#e0e7ff',
      accent: '#4f46e5'
    },
    focus: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      tertiary: '#c4b5fd',
      glow: '#ddd6fe',
      face: '#ede9fe',
      accent: '#7c3aed'
    },
    scholar: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      tertiary: '#93c5fd',
      glow: '#bfdbfe',
      face: '#dbeafe',
      accent: '#2563eb'
    },
    deepwork: {
      primary: '#6366f1',
      secondary: '#818cf8',
      tertiary: '#a5b4fc',
      glow: '#c7d2fe',
      face: '#fef3c7',
      accent: '#4f46e5'
    },
    coding: {
      primary: '#10b981',
      secondary: '#34d399',
      tertiary: '#6ee7b7',
      glow: '#a7f3d0',
      face: '#d1fae5',
      accent: '#059669'
    },
    creative: {
      primary: '#ec4899',
      secondary: '#f472b6',
      tertiary: '#f9a8d4',
      glow: '#fbcfe8',
      face: '#fce7f3',
      accent: '#db2777'
    },
    business: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      tertiary: '#fcd34d',
      glow: '#fde68a',
      face: '#fef3c7',
      accent: '#d97706'
    },
    security: {
      primary: '#ef4444',
      secondary: '#f87171',
      tertiary: '#fca5a5',
      glow: '#fecaca',
      face: '#fee2e2',
      accent: '#dc2626'
    },
    adventure: {
      primary: '#f97316',
      secondary: '#fb923c',
      tertiary: '#fdba74',
      glow: '#fed7aa',
      face: '#ffedd5',
      accent: '#ea580c'
    },
    chill: {
      primary: '#a855f7',
      secondary: '#c084fc',
      tertiary: '#d8b4fe',
      glow: '#e9d5ff',
      face: '#f3e8ff',
      accent: '#9333ea'
    }
  };

  const theme = themes[variant] || themes.standard;
  const uniqueId = `glassbot-${variant}-${Math.random().toString(36).substr(2, 9)}`;

  // Render the robot body with 3D glass effect
  const renderBody = () => (
    <g className="body">
      {/* Outer glow */}
      <ellipse
        cx="32"
        cy="34"
        rx="24"
        ry="26"
        fill={theme.glow}
        opacity="0.4"
        filter={`url(#${uniqueId}-blur)`}
      />
      
      {/* Main body - glass effect */}
      <ellipse
        cx="32"
        cy="34"
        rx="22"
        ry="24"
        fill={`url(#${uniqueId}-body-gradient)`}
        stroke={theme.primary}
        strokeWidth="1.5"
      />
      
      {/* Inner body highlight - top */}
      <ellipse
        cx="32"
        cy="28"
        rx="16"
        ry="12"
        fill={`url(#${uniqueId}-highlight)`}
        opacity="0.6"
      />
      
      {/* Glass reflection - top left */}
      <ellipse
        cx="22"
        cy="22"
        rx="6"
        ry="4"
        fill="white"
        opacity="0.7"
        transform="rotate(-20 22 22)"
      />
      
      {/* Glass reflection - small */}
      <circle
        cx="42"
        cy="24"
        r="2"
        fill="white"
        opacity="0.5"
      />
      
      {/* Bottom shadow/depth */}
      <ellipse
        cx="32"
        cy="52"
        rx="14"
        ry="4"
        fill={theme.accent}
        opacity="0.15"
      />
    </g>
  );

  // Render cute eyes with more detail
  const renderEyes = () => {
    if (variant === 'chill') {
      // Sleepy/relaxed eyes
      return (
        <g className="eyes sleepy">
          {/* Left eye closed/sleepy */}
          <path
            d="M20 36 Q24 34 28 36"
            fill="none"
            stroke={theme.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Right eye closed/sleepy */}
          <path
            d="M36 36 Q40 34 44 36"
            fill="none"
            stroke={theme.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Blush */}
          <ellipse cx="18" cy="40" rx="4" ry="2" fill={theme.tertiary} opacity="0.6" />
          <ellipse cx="46" cy="40" rx="4" ry="2" fill={theme.tertiary} opacity="0.6" />
        </g>
      );
    }

    if (variant === 'security') {
      // Determined/serious eyes
      return (
        <g className="eyes serious">
          {/* Eyebrows */}
          <path d="M18 28 L28 30" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
          <path d="M46 28 L36 30" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
          
          {/* Eye whites */}
          <ellipse cx="24" cy="36" rx="6" ry="5" fill="white" />
          <ellipse cx="40" cy="36" rx="6" ry="5" fill="white" />
          
          {/* Pupils */}
          <circle cx="25" cy="36" r="3" fill={theme.accent} />
          <circle cx="41" cy="36" r="3" fill={theme.accent} />
          
          {/* Highlights */}
          <circle cx="23" cy="34" r="1.5" fill="white" />
          <circle cx="39" cy="34" r="1.5" fill="white" />
        </g>
      );
    }

    // Default cute big eyes
    return (
      <g className="eyes cute">
        {/* Eye shadows */}
        <ellipse cx="24" cy="37" rx="7" ry="6" fill={theme.accent} opacity="0.1" />
        <ellipse cx="40" cy="37" rx="7" ry="6" fill={theme.accent} opacity="0.1" />
        
        {/* Eye whites */}
        <ellipse cx="24" cy="36" rx="7" ry="6" fill="white">
          {animated && (
            <animate
              attributeName="ry"
              values="6;1;6"
              dur="4s"
              repeatCount="indefinite"
              begin="2s"
            />
          )}
        </ellipse>
        <ellipse cx="40" cy="36" rx="7" ry="6" fill="white">
          {animated && (
            <animate
              attributeName="ry"
              values="6;1;6"
              dur="4s"
              repeatCount="indefinite"
              begin="2s"
            />
          )}
        </ellipse>
        
        {/* Pupils with gradient */}
        <circle cx="25" cy="37" r="3.5" fill={`url(#${uniqueId}-pupil)`} />
        <circle cx="41" cy="37" r="3.5" fill={`url(#${uniqueId}-pupil)`} />
        
        {/* Eye highlights - big */}
        <circle cx="22" cy="34" r="2" fill="white" opacity="0.95" />
        <circle cx="38" cy="34" r="2" fill="white" opacity="0.95" />
        
        {/* Eye highlights - small */}
        <circle cx="26" cy="38" r="1" fill="white" opacity="0.6" />
        <circle cx="42" cy="38" r="1" fill="white" opacity="0.6" />
        
        {/* Blush marks */}
        <ellipse cx="16" cy="42" rx="4" ry="2" fill={theme.tertiary} opacity="0.5" />
        <ellipse cx="48" cy="42" rx="4" ry="2" fill={theme.tertiary} opacity="0.5" />
      </g>
    );
  };

  // Render mouth expressions
  const renderMouth = () => {
    if (variant === 'chill') {
      return (
        <path
          d="M28 46 Q32 49 36 46"
          fill="none"
          stroke={theme.primary}
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    }

    if (variant === 'security') {
      return (
        <line
          x1="28" y1="46" x2="36" y2="46"
          stroke={theme.primary}
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    }

    // Default happy smile
    return (
      <path
        d="M26 44 Q32 51 38 44"
        fill="none"
        stroke={theme.primary}
        strokeWidth="2"
        strokeLinecap="round"
      />
    );
  };

  // Render antenna
  const renderAntenna = () => {
    if (variant === 'scholar' || variant === 'focus') return null;

    return (
      <g className="antenna">
        {/* Antenna stem */}
        <line
          x1="32" y1="10" x2="32" y2="3"
          stroke={theme.primary}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Antenna ball */}
        <circle cx="32" cy="2" r="3" fill={`url(#${uniqueId}-antenna)`}>
          {animated && (
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        {/* Antenna glow */}
        <circle cx="32" cy="2" r="5" fill={theme.glow} opacity="0.4">
          {animated && (
            <animate
              attributeName="r"
              values="5;7;5"
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>
    );
  };

  // Render variant-specific accessories
  const renderAccessory = () => {
    switch (variant) {
      case 'focus':
        // Premium headphones - larger and properly positioned
        return (
          <g className="accessory-headphones">
            {/* Headband */}
            <path
              d="M8 34 Q8 6 32 4 Q56 6 56 34"
              fill="none"
              stroke={theme.primary}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Headband highlight */}
            <path
              d="M12 32 Q12 10 32 8 Q52 10 52 32"
              fill="none"
              stroke={theme.secondary}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
            {/* Left ear cup - outer */}
            <ellipse cx="8" cy="36" rx="8" ry="12" fill={theme.primary} />
            {/* Left ear cup - inner */}
            <ellipse cx="8" cy="36" rx="5" ry="9" fill={theme.secondary} />
            {/* Left ear cup - highlight */}
            <ellipse cx="6" cy="32" rx="2" ry="4" fill={theme.tertiary} opacity="0.6" />
            {/* Left ear cup - padding */}
            <ellipse cx="12" cy="36" rx="3" ry="8" fill={theme.tertiary} opacity="0.4" />
            
            {/* Right ear cup - outer */}
            <ellipse cx="56" cy="36" rx="8" ry="12" fill={theme.primary} />
            {/* Right ear cup - inner */}
            <ellipse cx="56" cy="36" rx="5" ry="9" fill={theme.secondary} />
            {/* Right ear cup - highlight */}
            <ellipse cx="54" cy="32" rx="2" ry="4" fill={theme.tertiary} opacity="0.6" />
            {/* Right ear cup - padding */}
            <ellipse cx="52" cy="36" rx="3" ry="8" fill={theme.tertiary} opacity="0.4" />
          </g>
        );

      case 'scholar':
        // Graduation cap - positioned on TOP of head
        return (
          <g className="accessory-cap">
            {/* Cap top board - flat square on top */}
            <polygon points="32,2 6,12 32,18 58,12" fill="#1e293b" />
            {/* Cap top board highlight */}
            <polygon points="32,4 12,12 32,16 52,12" fill="#334155" />
            {/* Cap base/crown */}
            <path d="M22 16 L22 10 Q32 6 42 10 L42 16 Q32 20 22 16" fill="#475569" />
            {/* Button on top */}
            <circle cx="32" cy="4" r="2" fill="#64748b" />
            {/* Tassel string */}
            <path d="M32 4 Q40 6 50 10 Q54 14 56 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            {/* Tassel end */}
            <ellipse cx="56" cy="26" rx="3" ry="4" fill="#fbbf24" />
            <ellipse cx="56" cy="26" rx="2" ry="3" fill="#f59e0b" />
          </g>
        );

      case 'deepwork':
        // Stylish glasses
        return (
          <g className="accessory-glasses">
            {/* Left lens */}
            <rect x="14" y="32" width="14" height="11" rx="3" fill="rgba(99, 102, 241, 0.1)" stroke={theme.primary} strokeWidth="2" />
            {/* Right lens */}
            <rect x="36" y="32" width="14" height="11" rx="3" fill="rgba(99, 102, 241, 0.1)" stroke={theme.primary} strokeWidth="2" />
            {/* Bridge */}
            <path d="M28 37 Q32 35 36 37" fill="none" stroke={theme.primary} strokeWidth="2" />
            {/* Temple arms */}
            <line x1="14" y1="36" x2="8" y2="32" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="36" x2="56" y2="32" stroke={theme.primary} strokeWidth="2" strokeLinecap="round" />
            {/* Lens shine */}
            <rect x="16" y="34" width="4" height="2" rx="1" fill="white" opacity="0.6" />
            <rect x="38" y="34" width="4" height="2" rx="1" fill="white" opacity="0.6" />
          </g>
        );

      case 'coding':
        // Floating holographic terminal
        return (
          <g className="accessory-terminal">
            {/* Terminal window */}
            <rect x="12" y="2" width="40" height="20" rx="3" fill="rgba(16, 185, 129, 0.15)" stroke={theme.primary} strokeWidth="1.5" />
            {/* Title bar */}
            <rect x="12" y="2" width="40" height="5" rx="3" fill={theme.primary} opacity="0.3" />
            {/* Window controls */}
            <circle cx="16" cy="4.5" r="1.5" fill="#ef4444" />
            <circle cx="21" cy="4.5" r="1.5" fill="#fbbf24" />
            <circle cx="26" cy="4.5" r="1.5" fill="#22c55e" />
            {/* Code lines */}
            <rect x="15" y="9" width="12" height="2" rx="1" fill={theme.tertiary} opacity="0.8" />
            <rect x="18" y="13" width="18" height="2" rx="1" fill={theme.tertiary} opacity="0.6" />
            <rect x="15" y="17" width="10" height="2" rx="1" fill={theme.tertiary} opacity="0.7" />
            {/* Cursor */}
            <rect x="42" y="9" width="2" height="10" fill={theme.glow}>
              {animated && (
                <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
              )}
            </rect>
            {/* Connection dots */}
            <circle cx="32" cy="24" r="1.5" fill={theme.primary} opacity="0.5" />
          </g>
        );

      case 'creative':
        // Paint splashes around (NOT on face) and palette
        return (
          <g className="accessory-creative">
            {/* Paint palette floating above */}
            <ellipse cx="48" cy="10" rx="12" ry="8" fill="#92400e" />
            <ellipse cx="48" cy="10" rx="10" ry="6" fill="#a16207" />
            {/* Paint dots on palette */}
            <circle cx="42" cy="8" r="2.5" fill="#ef4444" />
            <circle cx="48" cy="6" r="2.5" fill="#fbbf24" />
            <circle cx="54" cy="8" r="2.5" fill="#22c55e" />
            <circle cx="51" cy="12" r="2" fill="#3b82f6" />
            <circle cx="45" cy="12" r="2" fill="#a855f7" />
            {/* Thumb hole */}
            <ellipse cx="40" cy="12" rx="3" ry="4" fill="#78350f" />
            
            {/* Paint brush */}
            <g transform="translate(56, 14) rotate(45)">
              <rect x="0" y="0" width="3" height="10" fill="#92400e" rx="0.5" />
              <rect x="-0.5" y="8" width="4" height="6" fill="#ec4899" rx="1" />
            </g>
            
            {/* Floating paint drops around head (not on face) */}
            <circle cx="8" cy="28" r="3" fill="#ec4899" opacity="0.8" />
            <circle cx="56" cy="44" r="2.5" fill="#8b5cf6" opacity="0.8" />
            <circle cx="12" cy="50" r="2" fill="#10b981" opacity="0.8" />
            <circle cx="52" cy="52" r="2" fill="#fbbf24" opacity="0.8" />
          </g>
        );

      case 'business':
        // Tie and briefcase icon
        return (
          <g className="accessory-business">
            {/* Tie */}
            <polygon points="32,48 28,53 32,55 36,53" fill={theme.primary} />
            <polygon points="28,53 32,55 36,53 34,62 32,64 30,62" fill={theme.secondary} />
            <line x1="32" y1="55" x2="32" y2="62" stroke={theme.primary} strokeWidth="1" />
            {/* Crown/star badge */}
            <g transform="translate(48, 12)">
              <polygon points="6,0 7.5,4 12,5 9,8 10,12 6,10 2,12 3,8 0,5 4.5,4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
            </g>
          </g>
        );

      case 'security':
        // Shield badge on corner with subtle glow effect
        return (
          <g className="accessory-security">
            {/* Subtle protective aura - solid, not dotted */}
            <ellipse 
              cx="32" 
              cy="36" 
              rx="28" 
              ry="30" 
              fill="none" 
              stroke={theme.tertiary} 
              strokeWidth="2" 
              opacity="0.2"
            />
            <ellipse 
              cx="32" 
              cy="36" 
              rx="32" 
              ry="34" 
              fill="none" 
              stroke={theme.glow} 
              strokeWidth="1" 
              opacity="0.15"
            />
            
            {/* Shield */}
            <path
              d="M50 6 L60 10 L60 18 Q60 26 50 30 Q40 26 40 18 L40 10 Z"
              fill={`url(#${uniqueId}-shield)`}
              stroke={theme.primary}
              strokeWidth="1.5"
            />
            <path
              d="M50 8 L58 11 L58 17 Q58 24 50 27 Q42 24 42 17 L42 11 Z"
              fill={theme.secondary}
              opacity="0.3"
            />
            {/* Checkmark */}
            <path
              d="M46 16 L49 20 L56 12"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'adventure':
        // Goggles on forehead + compass
        return (
          <g className="accessory-adventure">
            {/* Goggle strap */}
            <ellipse cx="32" cy="16" rx="18" ry="8" fill="none" stroke="#78350f" strokeWidth="3" />
            {/* Left goggle */}
            <circle cx="22" cy="16" r="8" fill={`url(#${uniqueId}-goggle)`} stroke={theme.primary} strokeWidth="2" />
            <circle cx="22" cy="16" r="5" fill="none" stroke={theme.glow} strokeWidth="1" opacity="0.6" />
            <ellipse cx="19" cy="14" rx="2.5" ry="1.5" fill="white" opacity="0.7" />
            {/* Right goggle */}
            <circle cx="42" cy="16" r="8" fill={`url(#${uniqueId}-goggle)`} stroke={theme.primary} strokeWidth="2" />
            <circle cx="42" cy="16" r="5" fill="none" stroke={theme.glow} strokeWidth="1" opacity="0.6" />
            <ellipse cx="39" cy="14" rx="2.5" ry="1.5" fill="white" opacity="0.7" />
            {/* Compass badge */}
            <g transform="translate(48, 48)">
              <circle cx="6" cy="6" r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
              <circle cx="6" cy="6" r="4" fill="white" />
              <polygon points="6,2 7,6 6,4 5,6" fill="#ef4444" />
              <polygon points="6,10 7,6 6,8 5,6" fill="#1e293b" />
            </g>
          </g>
        );

      case 'chill':
        // Z's for sleeping + cloud
        return (
          <g className="accessory-chill">
            {/* Sleeping Z's */}
            <text x="48" y="20" fontSize="10" fontWeight="bold" fill={theme.primary} opacity="0.7">Z</text>
            <text x="52" y="14" fontSize="8" fontWeight="bold" fill={theme.secondary} opacity="0.5">z</text>
            <text x="55" y="10" fontSize="6" fontWeight="bold" fill={theme.tertiary} opacity="0.3">z</text>
            {/* Cloud effect */}
            <ellipse cx="28" cy="50" rx="10" ry="4" fill="white" opacity="0.4">
              {animated && (
                <animate attributeName="cx" values="28;32;28" dur="4s" repeatCount="indefinite" />
              )}
            </ellipse>
            <ellipse cx="38" cy="48" rx="6" ry="3" fill="white" opacity="0.3">
              {animated && (
                <animate attributeName="cx" values="38;34;38" dur="3s" repeatCount="indefinite" />
              )}
            </ellipse>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`glass-bot glass-bot-${variant} ${className}`}
      style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))' }}
    >
      <defs>
        {/* Body gradient */}
        <linearGradient id={`${uniqueId}-body-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.tertiary} />
          <stop offset="50%" stopColor={theme.secondary} />
          <stop offset="100%" stopColor={theme.primary} />
        </linearGradient>

        {/* Top highlight gradient */}
        <radialGradient id={`${uniqueId}-highlight`} cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Pupil gradient */}
        <radialGradient id={`${uniqueId}-pupil`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={theme.secondary} />
          <stop offset="100%" stopColor={theme.accent} />
        </radialGradient>

        {/* Antenna gradient */}
        <radialGradient id={`${uniqueId}-antenna`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={theme.glow} />
          <stop offset="100%" stopColor={theme.primary} />
        </radialGradient>

        {/* Accessory gradient */}
        <linearGradient id={`${uniqueId}-accessory`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.primary} />
          <stop offset="50%" stopColor={theme.secondary} />
          <stop offset="100%" stopColor={theme.primary} />
        </linearGradient>

        {/* Shield gradient */}
        <linearGradient id={`${uniqueId}-shield`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.tertiary} />
          <stop offset="100%" stopColor={theme.primary} />
        </linearGradient>

        {/* Goggle lens gradient */}
        <radialGradient id={`${uniqueId}-goggle`} cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor={theme.glow} stopOpacity="0.3" />
          <stop offset="100%" stopColor={theme.primary} stopOpacity="0.1" />
        </radialGradient>

        {/* Blur filter */}
        <filter id={`${uniqueId}-blur`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* Render components in order */}
      {renderAntenna()}
      {renderBody()}
      {renderEyes()}
      {renderMouth()}
      {renderAccessory()}
    </svg>
  );
};

// Export variant names for easy reference
export const AVATAR_VARIANTS = [
  'standard',
  'focus',
  'scholar',
  'deepwork',
  'coding',
  'creative',
  'business',
  'security',
  'adventure',
  'chill'
];

// Variant metadata for UI
export const AVATAR_INFO = {
  standard: { name: 'Glow Bot', description: 'The friendly default', emoji: '✨' },
  focus: { name: 'Focus Bot', description: 'Deep in the zone', emoji: '🎧' },
  scholar: { name: 'Scholar Bot', description: 'Always learning', emoji: '🎓' },
  deepwork: { name: 'Deep Work Bot', description: 'Serious mode', emoji: '👓' },
  coding: { name: 'Coding Bot', description: 'In the matrix', emoji: '💻' },
  creative: { name: 'Creative Bot', description: 'Full of ideas', emoji: '🎨' },
  business: { name: 'Business Bot', description: 'Means business', emoji: '👔' },
  security: { name: 'Security Bot', description: 'On guard', emoji: '🛡️' },
  adventure: { name: 'Adventure Bot', description: 'Ready to explore', emoji: '🥽' },
  chill: { name: 'Chill Bot', description: 'Taking it easy', emoji: '😌' }
};

export default GlassBot;
