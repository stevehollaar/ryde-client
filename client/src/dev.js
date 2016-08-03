/**
 * This bundle will only be included in local dev.
 */
import Perf from 'react-addons-perf';

// Expose ReactPerf on window for performance analysis from console.
// https://facebook.github.io/react/docs/perf.html
window.Perf = Perf;
