import { paths } from "./paths";

export const routes = [
  {
    name      : "Home",
    roles     : [],
    path      : paths.UYGULAMALAR_PATH,
    component : "Login",
  },
  {
    name      : "Home",
    roles     : [],
    path      : paths.HAKEDIS_PATH,
    component : "HakedisListesi",
  },
  {
    name      : "Home",
    roles     : [],
    path      : paths.HAKEDISTANIM_PATH,
    component : "HakedisTanim",
  },
  {
    name: "Kullanıcı Tablosu",
    roles: [],
    path: paths.KULLANICI_PATH,
    component: "KullaniciTablosu",
  },
  {
    name: "Rol Tablosu",
    roles: [],
    path: paths.ROL_PATH,
    component: "RolTablosu",
  },
  {
    name: "Yetki Tablosu",
    roles: [],
    path: paths.YETKI_PATH,
    component: "YetkiTablosu",
  }
];