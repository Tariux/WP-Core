<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           The_Box
 *
 * @wordpress-plugin
 * Plugin Name:       THE BOX | deveoping
 * Plugin URI:        http://example.com/the-box/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Tariux
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       the-box
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once plugin_dir_path( __FILE__ ) . 'includes/utilities/helpers.php';
require_once plugin_dir_path( __FILE__ ) . 'config.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/activator.php
 */
function activate_the_box() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/activator.php';
	The_Box_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/deactivator.php
 */
function deactivate_the_box() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/deactivator.php';
	The_Box_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_the_box' );
register_deactivation_hook( __FILE__, 'deactivate_the_box' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-the-box.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_the_box() {

	$plugin = new The_Box();
	$plugin->run();

}
run_the_box();
