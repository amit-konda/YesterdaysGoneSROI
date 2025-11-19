<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class YG_SROI_Calculator_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'yg_sroi_calculator';
    }

    public function get_title() {
        return esc_html__('SROI Calculator', 'yg-sroi');
    }

    public function get_icon() {
        return 'eicon-calculator';
    }

    public function get_categories() {
        return ['yesterdays-gone'];
    }

    public function get_keywords() {
        return ['sroi', 'calculator', 'donation', 'yesterdays gone', 'impact'];
    }

    protected function register_controls() {
        // Content Section
        $this->start_controls_section(
            'content_section',
            [
                'label' => esc_html__('Settings', 'yg-sroi'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'sroi_url',
            [
                'label' => esc_html__('SROI App URL', 'yg-sroi'),
                'type' => \Elementor\Controls_Manager::URL,
                'placeholder' => esc_html__('https://sroi.yesterdaysgone.org', 'yg-sroi'),
                'default' => [
                    'url' => 'https://sroi.yesterdaysgone.org',
                    'is_external' => true,
                    'nofollow' => true,
                ],
                'description' => esc_html__('Enter the URL where your SROI calculator is hosted', 'yg-sroi'),
            ]
        );

        $this->add_control(
            'iframe_height',
            [
                'label' => esc_html__('Height (px)', 'yg-sroi'),
                'type' => \Elementor\Controls_Manager::NUMBER,
                'default' => 1200,
                'min' => 500,
                'max' => 3000,
                'step' => 50,
                'description' => esc_html__('Initial height of the iframe. Enable auto-resize below to adjust automatically.', 'yg-sroi'),
            ]
        );

        $this->add_control(
            'auto_resize',
            [
                'label' => esc_html__('Auto-Resize Height', 'yg-sroi'),
                'type' => \Elementor\Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Yes', 'yg-sroi'),
                'label_off' => esc_html__('No', 'yg-sroi'),
                'return_value' => 'yes',
                'default' => 'yes',
                'description' => esc_html__('Automatically adjust iframe height to match content (requires code in React app)', 'yg-sroi'),
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'style_section',
            [
                'label' => esc_html__('Style', 'yg-sroi'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'border_radius',
            [
                'label' => esc_html__('Border Radius', 'yg-sroi'),
                'type' => \Elementor\Controls_Manager::SLIDER,
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'unit' => 'px',
                    'size' => 0,
                ],
                'selectors' => [
                    '{{WRAPPER}} .yg-sroi-iframe' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'container_padding',
            [
                'label' => esc_html__('Padding', 'yg-sroi'),
                'type' => \Elementor\Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors' => [
                    '{{WRAPPER}} .yg-sroi-container' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $url = $settings['sroi_url']['url'] ?? 'https://sroi.yesterdaysgone.org';
        $height = $settings['iframe_height'] ?? 1200;
        $auto_resize = $settings['auto_resize'] === 'yes';
        $widget_id = 'yg-sroi-iframe-' . $this->get_id();
        
        ?>
        <div class="yg-sroi-container">
            <iframe 
                id="<?php echo esc_attr($widget_id); ?>"
                class="yg-sroi-iframe"
                src="<?php echo esc_url($url); ?>" 
                width="100%" 
                height="<?php echo esc_attr($height); ?>" 
                frameborder="0"
                style="width: 100%; border: none; display: block;"
                loading="lazy"
                allow="fullscreen">
            </iframe>
        </div>
        <?php if ($auto_resize): ?>
        <script>
        (function() {
            var iframe = document.getElementById('<?php echo esc_js($widget_id); ?>');
            if (!iframe) return;
            
            function handleMessage(e) {
                if (e.data && e.data.type === 'sroi-height' && e.data.height) {
                    iframe.style.height = e.data.height + 'px';
                }
            }
            
            window.addEventListener('message', handleMessage);
            
            // Cleanup on widget removal (Elementor editor)
            if (typeof elementorFrontend !== 'undefined') {
                elementorFrontend.hooks.addAction('frontend/element_ready/yg_sroi_calculator.default', function($scope) {
                    // Widget is ready
                });
            }
        })();
        </script>
        <?php endif; ?>
        <?php
    }

    protected function content_template() {
        ?>
        <#
        var url = settings.sroi_url.url || 'https://sroi.yesterdaysgone.org';
        var height = settings.iframe_height || 1200;
        var autoResize = settings.auto_resize === 'yes';
        var widgetId = 'yg-sroi-iframe-' + view.getID();
        #>
        <div class="yg-sroi-container">
            <iframe 
                id="{{{ widgetId }}}"
                class="yg-sroi-iframe"
                src="{{{ url }}}" 
                width="100%" 
                height="{{{ height }}}" 
                frameborder="0"
                style="width: 100%; border: none; display: block;"
                loading="lazy">
            </iframe>
        </div>
        <?php
    }
}

