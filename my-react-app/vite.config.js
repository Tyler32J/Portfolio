import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
plugins: [react()],
preview: {
host: "0.0.0.0",
// A leading dot allows the domain itself and every subdomain (www.tylerfarrellsportfolio.com too)
allowedHosts: [".up.railway.app", ".tylerfarrellsportfolio.com"]
}
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
