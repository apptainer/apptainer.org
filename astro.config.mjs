import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: 'https://apptainer.org',
	output: 'static',
	integrations: [tailwind({ applyBaseStyles: true }), react()],
});
