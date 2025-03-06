<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    The_Box
 * @subpackage The_Box/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    The_Box
 * @subpackage The_Box/admin
 * @author     Your Name <email@example.com>
 */
class The_Box_Admin {

	private static $pages = [];
    private $menus;
	private $the_box;
	private $version;

	public function __construct( $the_box, $version ) {
		$this->menus = [
			[
				'page_title' => 'Box',
				'menu_title' => 'Box',
				'capability' => 'manage_options',
				'menu_slug' => 'the-box',
				'function' => 'display',
				'icon_url' => 'data:image/svg+xml;base64,' . base64_encode('<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" viewBox="750 132.8437 350 566.3126"><path fill="#a7aaad" d="M 869 133.91 C 864.8 134.85 860.7 138.71 808.87 190.54 L 753.25 246.15 L 751.62 252.86 C 750.18 258.83 750 270.78 750 361.653 C 750 452.524 750.18 464.479 751.62 470.447 L 753.25 477.153 L 808.87 532.755 L 864.5 588.358 L 870.25 589.577 C 874.77 590.536 877.22 590.536 881.75 589.577 L 887.5 588.358 L 943.6 532.256 L 999.7 476.153 L 1000.93 470.343 C 1002.44 463.225 1001.06 455.94 997.18 450.653 C 995.77 448.728 976.94 429.363 955.34 407.62 L 916.05 368.087 L 945.02 339.126 L 974 310.17 L 1009 345.154 L 1044 380.142 L 1044 471.623 L 1044 563.103 L 999.63 607.628 L 955.27 652.153 L 953.63 658.859 C 951.56 667.37 951.57 673.029 953.67 681.423 C 956.95 694.462 968 701.363 981.05 698.524 L 986.5 697.339 L 1041.62 642.246 L 1096.74 587.153 L 1098.37 580.447 C 1099.82 574.479 1100 562.526 1100 471.653 C 1100 380.782 1099.82 368.827 1098.37 362.859 L 1096.74 356.153 L 1041.12 300.55 L 985.5 244.95 L 979.75 243.73 C 975.22 242.77 972.77 242.77 968.25 243.73 L 962.5 244.95 L 906.39 301.05 L 850.29 357.153 L 849.07 362.903 C 848.1 367.487 848.11 369.819 849.13 374.403 C 850.66 381.248 851.2 381.846 901.2 432.159 L 934 465.165 L 905 494.153 L 876 523.141 L 841 488.152 L 806 453.164 L 806 361.6 L 806 270.04 L 851.38 224.84 L 896.76 179.64 L 898.38 173.19 C 900.44 164.98 900.42 159.26 898.32 150.88 C 896.08 141.96 890.13 135.7 882.17 133.87 C 876.15 132.49 875.26 132.5 869 133.91" stroke="none" fillRule="evenodd" id="object-0" /></svg>'),
				'position' => 999,
				'class_name' => 'The_Box_Admin_Home_Dispay',
				'class_path'=> 'admin/partials/homepage.php' 
			]
		];
		foreach ($this->menus as $menu_index => $menu) {
			if (!isset($this->pages[$menu['class_name']])) {
				require_once plugin_dir_path( dirname( __FILE__ ) ) . $menu['class_path'];
			}
		}

		$this->the_box = $the_box;
		$this->version = $version;
	}

	public function enqueue_styles() {
		// wp_enqueue_style( $this->the_box, plugin_dir_url( __FILE__ ) . 'css/styles.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->the_box . '-admin', THE_BOX_SRC_DIST_URL . 'css/admin.css', array(), $this->version, 'all' );
	}


	public function enqueue_scripts() {
		// wp_enqueue_script( $this->the_box, plugin_dir_url( __FILE__ ) . 'js/main.js', array( 'jquery' ), $this->version, false );
		$version = $this->version;
		$handle = $this->the_box;
	
		wp_enqueue_script(
			$handle . '-runtime',
			THE_BOX_SRC_DIST_URL . 'js/runtime.js',
			[],
			$version,
			false
		);
	
		wp_enqueue_script(
			$handle . '-vendors',
			THE_BOX_SRC_DIST_URL . 'js/vendors.js',
			[],
			$version,
			false
		);
	
		wp_enqueue_script(
			$handle . '-admin',
			THE_BOX_SRC_DIST_URL . 'js/admin.js',
			[],
			$version,
			true
		);
	}

	public function enqueue_admin_pages() {
			foreach ($this->menus as $menu_index => $menu) {

				if (isset($this->pages[$menu['class_name']])) {
					$page_class = $this->pages[$menu['class_name']];
				}
				else {
					$page_class = new $menu['class_name']();
					$this->pages[$menu['class_name']] = $page_class;
				}
				add_menu_page(
					__($menu['page_title'], 'the-box'), 
					__($menu['menu_title'], 'the-box'),
					$menu['capability'],
					$menu['menu_slug'],
					array($page_class, $menu['function']),
					$menu['icon_url'],
					$menu['position']
				);
			}
	
	}

}
