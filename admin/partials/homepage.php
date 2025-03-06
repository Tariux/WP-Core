<?php

class The_Box_Admin_Home_Dispay
{
    public $htmlContent;
    public function __construct()
    {
        $this->loadPage();
    }
    private function loadPage() {
        $filePath = THE_BOX_SRC_DIST . 'admin-wp.html';

        $this->htmlContent = "<p class='the-box-not-found-root'>Failed to load page content</p>";
        try {
            if (!file_exists($filePath)) {
                error_log("Page does not exist"); // Log the error
                return;
            }
            if (!is_readable($filePath)) {
                error_log("Page is not readable"); // Log the error
                return;
            }
            $content = file_get_contents($filePath);
            if ($content === false) {
                error_log("Page to read the file"); // Log the error
                return;
            }

            $this->htmlContent = $content;
        } catch (\Throwable $th) {
            error_log("Error loading page: " . $th->getMessage());
        }
    }

    public function display()
    {
        echo $this->htmlContent;
    }
}
