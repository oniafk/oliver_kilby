/**
 * Numeric constants shared between the WebGL renderer, camera, and scene code.
 * Centralized so camera step and scene layout cannot drift.
 */

/** Vertical distance (in world units) the camera travels per viewport of scroll. */
export const OBJECTS_DISTANCE = 2;

/** Perspective camera FOV, in degrees. */
export const CAMERA_FOV = 35;

/** Perspective camera near plane. */
export const CAMERA_NEAR = 0.1;

/** Perspective camera far plane. */
export const CAMERA_FAR = 100;

/** Initial camera Z position (world units). With fov=35, z=6 fits ~3.8 world units vertically. */
export const CAMERA_Z = 6;

/** Maximum device pixel ratio used by the renderer. Caps cost on retina/mobile. */
export const MAX_DPR = 2;

/** IntersectionObserver threshold for section-index tracking. */
export const SECTION_OBSERVER_THRESHOLD = 0.5;

/** POC cube edge length (world units). */
export const CUBE_SIZE = 0.4;

/** POC cube world-space X offset. */
export const CUBE_X = 1.5;

/** Per-frame rotation increments for the POC cube (radians). */
export const CUBE_ROT_X = 0.001;
export const CUBE_ROT_Y = 0.002;

/** Mouse lens distortion radius (UV units, aspect-corrected). */
export const MOUSE_LENS_RADIUS = 0.13;

/** Mouse lens distortion strength (0 = no distortion, 1 = strong). */
export const MOUSE_LENS_STRENGTH = 0.35;
