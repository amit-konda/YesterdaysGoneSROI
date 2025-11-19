<?php
/**
 * Plugin Name: Yesterday's Gone SROI Widget
 * Description: Elementor widget for embedding the SROI calculator
 * Version: 1.0.0
 * Author: Yesterday's Gone
 * Text Domain: yg-sroi
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class YG_SROI_Widget {
    
    public function __construct() {
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/elements/categories_registered', [$this, 'add_elementor_widget_categories']);
    }
    
    public function add_elementor_widget_categories($elements_manager) {
        $elements_manager->add_category(
            'yesterdays-gone',
            [
                'title' => esc_html__("Yesterday's Gone", 'yg-sroi'),
                'icon' => 'fa fa-heart',
            ]
        );
    }
    
    public function register_widgets($widgets_manager) {
        require_once __DIR__ . '/widgets/sroi-calculator-widget.php';
        $widgets_manager->register(new \YG_SROI_Calculator_Widget());
    }
}

new YG_SROI_Widget();

