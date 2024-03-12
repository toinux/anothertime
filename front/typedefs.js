/**
 * @typedef {string} Color
 */

/**
 * @typedef {string} Icon
 */

/**
 * @typedef {'NONE'|'SCROLL'|'FADE'} WidgetAnimation
 */

/**
 * @typedef {'FADE'|'SCROLL'} Animation
 */

/**
 * @typedef {{enabled: boolean, color: Color}} WidgetProperties
 */

/**
 * @typedef {color: Color, backgroundColor: color} SecondsProperties
 */

/**
 * @typedef {WidgetProperties} CalendarWidgetProperties
 * @property {'ICON'|'LARGE'|'SMALL'} style
 * @property {Icon} icon
 * @property {Color} headColor
 * @property {Color} bodyColor
 * @property {Color} textColor
 */

/**
 * @typedef {WidgetProperties} TemperatureWidgetProperties
 * @property {Icon} icon
 * @property {boolean} fahrenheit
 */


/**
 *
 * @typedef {Object|null} AnothertimeConfig - anothertime configuration
 * @property {Object} time
 * @property {Animation} time.separator
 * @property {string} time.hourColor
 * @property {string} time.minutesColor
 * @property {string} time.separatorColor
 * @property {WidgetAnimation} widgets.animation
 * @property {CalendarWidgetProperties} widgets.calendar
 * @property {TemperatureWidgetProperties} widgets.temperature
 * @property {SecondsProperties} seconds
 */
