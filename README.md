# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

The primary goal of this project was to develop an automatic detection and classification system for X-ray bursts in cosmic data. X-ray bursts, such as those originating from solar flares or other cosmic sources, exhibit specific patterns like fast rise and slow decay. Detecting, extracting features, and classifying these bursts are crucial for astrophysical research.

This project involves processing light curve (LC) and good time interval (GTI) data to analyze X-ray bursts, detect burst peaks, extract important features like rise time, decay time, and peak flux, and classify the bursts into various types (e.g., normal bursts, mini-bursts, meso-bursts, structured bursts, microbursts).
