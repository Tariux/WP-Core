<?php

/**
 * Fired during plugin deactivation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    The_Box
 * @subpackage The_Box/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    The_Box
 * @subpackage The_Box/includes
 * @author     Your Name <email@example.com>
 */
class The_Box_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'my_crud_table';
		$wpdb->query("DROP TABLE IF EXISTS $table_name");
	}

}
