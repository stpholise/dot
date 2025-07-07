import { onCLS, onFCP, onLCP,  onINP } from 'web-vitals';

export function WebVitals() {
  onCLS((metric) => {
    console.log('Cumulative Layout Shift:', metric.value);
  });

  onFCP((metric) => {
    console.log('First Contentful Paint:', metric.value);
  });

  onLCP((metric) => {
    console.log('Largest Contentful Paint:', metric.value);
  });


  onINP((metric) => {
    console.log('Interaction to Next Paint:', metric.value);
  });
}