const isColorDark = (color) => {
    // Convert hex color to RGB
    const rgb = parseInt(color.slice(1), 16); 
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    // Return true if the color is dark
    return luminance < 128;
};

export default isColorDark;