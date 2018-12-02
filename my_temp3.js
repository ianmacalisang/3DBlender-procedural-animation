"use strict"

import b4w from "blend4web";

var m_app     = b4w.app;
var m_data    = b4w.data;
var m_scs     = b4w.scenes;
var m_trans   = b4w.transform;
var m_cfg     = b4w.config;
var m_version = b4w.version;
var m_preloader = b4w.preloader;

var DEBUG = (m_version.type() === "DEBUG");

var APP_ASSETS_PATH = m_cfg.get_assets_path("my_temp3");

export function init() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        physics_enabled: false,
        show_fps: true,
        alpha: false,
        autoresize: true,
        assets_dds_available: !DEBUG,
        assets_min50_available: !DEBUG,
        console_verbose: true
    });
}

function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    load();
}

function load() {
    m_data.load(APP_ASSETS_PATH + "/instancing.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

function load_cb(data_id) {
    m_app.enable_camera_controls(false, false, false, null, true);

	// Place your code here
    create_slider();
	
	var my_slider = document.getElementById("slider_id");
	var monkey = m_scs.get_object_by_name("Suzanne");

	var myVar = setInterval(myTimer, 20); 
	var z = 0;
	
	function myTimer() {
		z += my_slider.value/1000;
		if (z > 3) z = -3;
		m_trans.set_translation(monkey, 0, 0, z);
	}
}

function create_slider() {
	var slider = document.createElement("INPUT");
    slider.id = "slider_id";
    slider.setAttribute("type", "range");
    slider.setAttribute("min", "0");
    slider.setAttribute("max", "100");
    slider.setAttribute("value", "50");
    slider.style.position = "relative";
    slider.style.width = "33%";
    document.body.appendChild(slider);
}

init();