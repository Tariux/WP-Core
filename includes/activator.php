<?php

/**
 * Fired during plugin activation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    The_Box
 * @subpackage The_Box/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    The_Box
 * @subpackage The_Box/includes
 * @author     Your Name <email@example.com>
 */
class The_Box_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'my_crud_table';
		$charset_collate = $wpdb->get_charset_collate();
		$sql = "CREATE TABLE $table_name (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			title varchar(255) NOT NULL,
			content longtext NOT NULL,
			created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
			PRIMARY KEY (id)
		) $charset_collate;";
	
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	
	}

}
