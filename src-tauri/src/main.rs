// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};

#[tauri::command]
fn expand_scope(
    app_handle: tauri::AppHandle,
    file_path: std::path::PathBuf,
) -> Result<(), String> {
    app_handle
        .fs_scope()
        .allow_file(&file_path)
        .map_err(|err| err.to_string())
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new().add_item(quit);

    let tray = SystemTray::new()
        .with_menu(tray_menu)
        .with_tooltip("mInetiface config");

    tauri::Builder::default()
        .system_tray(tray)
        .invoke_handler(tauri::generate_handler![expand_scope])
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                let window = app.get_window("main").unwrap();
                window.show().unwrap();
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
