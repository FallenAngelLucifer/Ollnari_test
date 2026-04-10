import fs from 'fs';

const logPath = '/.gemini/antigravity/brain/e5aebe6f-4f1d-4461-bdb1-ab0e23c41ebf/.system_generated/logs/overview.txt';

try {
  const logContent = fs.readFileSync(logPath, 'utf-8');
  const svgStart = logContent.lastIndexOf('<svg');
  const svgEnd = logContent.indexOf('</svg>', svgStart) + 6;
  
  if (svgStart !== -1 && svgEnd !== -1) {
    const svgContent = logContent.substring(svgStart, svgEnd);
    
    // We need to clean up the SVG to make it valid JSX
    // 1. Remove XML declaration if any
    // 2. Remove namespaces
    // 3. Convert attributes to camelCase (e.g., viewBox)
    // 4. Add onClick handlers to paths
    
    let cleanSvg = svgContent
      .replace(/xmlns:mapsvg="[^"]*"/g, '')
      .replace(/xmlns:dc="[^"]*"/g, '')
      .replace(/xmlns:rdf="[^"]*"/g, '')
      .replace(/xmlns:svg="[^"]*"/g, '')
      .replace(/xmlns="[^"]*"/g, '')
      .replace(/mapsvg:geoViewBox="[^"]*"/g, '')
      .replace(/<svg[^>]*>/, '<svg viewBox="0 0 595 530" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="xMidYMid meet">')
      .replace(/<path/g, '<path className="transition-all duration-300 cursor-pointer hover:fill-terracotta hover:opacity-80 stroke-white stroke-[1px]" fill="#e6d5c3" onClick={(e) => onRegionClick && onRegionClick(e.currentTarget.id)}');

    const reactComponent = `import React from 'react';

export const MapaNicaragua = ({ className = "", onRegionClick, activeRegion }: { className?: string, onRegionClick?: (id: string) => void, activeRegion?: string }) => {
  return (
    <div className={className}>
      ${cleanSvg}
    </div>
  );
};
`;
    
    fs.writeFileSync('/app/applet/src/components/MapaSvg.tsx', reactComponent);
    console.log('Successfully extracted and saved SVG component.');
  } else {
    console.log('Could not find SVG in logs.');
  }
} catch (err) {
  console.error('Error:', err);
}
