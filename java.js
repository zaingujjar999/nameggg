document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Color selection functionality
    const colorOptions = document.querySelectorAll('.color-option');
    let selectedColor = '#4361ee'; // Default color
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedColor = option.getAttribute('data-color');
            
            // Update logo preview with selected color
            const logoPreview = document.getElementById('logoPreview');
            logoPreview.style.background = `linear-gradient(135deg, ${selectedColor}, ${lightenColor(selectedColor, 20)})`;
        });
    });
    
    // Brand name generator
    const generateNameBtn = document.getElementById('generateNameBtn');
    const nameList = document.getElementById('nameList');
    const nameResults = document.getElementById('nameResults');
    
    generateNameBtn.addEventListener('click', () => {
        const keywords = document.getElementById('keywords').value;
        const industry = document.getElementById('industry').value;
        
        if (!keywords) {
            alert('Please enter some keywords to generate names');
            return;
        }
        
        // Simulate loading
        generateNameBtn.disabled = true;
        generateNameBtn.textContent = 'Generating...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            const names = generateBrandNames(keywords, industry);
            displayNames(names);
            generateNameBtn.disabled = false;
            generateNameBtn.textContent = 'Generate Names';
        }, 1000);
    });
    
    function generateBrandNames(keywords, industry) {
        // This is a mock function - in a real app, you'd call an API
        const words = keywords.split(',').map(w => w.trim());
        const prefixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta'];
        const suffixes = ['Tech', 'Labs', 'Solutions', 'Innovations', 'Systems', 'Digital', 'Group', 'Ventures'];
        const industryWords = {
            tech: ['Byte', 'Code', 'Data', 'Cloud', 'AI', 'Dev', 'Net', 'Soft'],
            fashion: ['Style', 'Trend', 'Vogue', 'Chic', 'Moda', 'Glam', 'Wear', 'Look'],
            food: ['Bite', 'Taste', 'Flavor', 'Yum', 'Eats', 'Dish', 'Plate', 'Savor'],
            health: ['Vita', 'Well', 'Pure', 'Care', 'Life', 'Fit', 'Zen', 'Balance'],
            finance: ['Capital', 'Wealth', 'Fund', 'Trust', 'Value', 'Asset', 'Growth', 'Equity'],
            education: ['Learn', 'Skill', 'Mind', 'Academy', 'Edu', 'Study', 'Brain', 'Wisdom']
        };
        
        const industrySpecific = industryWords[industry] || [];
        const allWords = [...words, ...industrySpecific];
        
        let names = [];
        
        // Generate combinations
        for (let i = 0; i < 12; i++) {
            let name = '';
            
            if (Math.random() > 0.5) {
                // Prefix + Word
                name = prefixes[Math.floor(Math.random() * prefixes.length)] + 
                       allWords[Math.floor(Math.random() * allWords.length)];
            } else {
                // Word + Suffix
                name = allWords[Math.floor(Math.random() * allWords.length)] + 
                       suffixes[Math.floor(Math.random() * suffixes.length)];
            }
            
            // Make sure name is unique
            if (!names.includes(name)) {
                names.push(name);
            } else {
                i--; // Try again
            }
        }
        
        return names;
    }
    
    function displayNames(names) {
        nameList.innerHTML = '';
        
        names.forEach(name => {
            const nameItem = document.createElement('div');
            nameItem.className = 'name-item';
            nameItem.textContent = name;
            
            nameItem.addEventListener('click', () => {
                // Update brand name input in logo tab
                document.getElementById('brandName').value = name;
                // Update logo preview text
                document.getElementById('logoText').textContent = name;
                // Switch to logo tab
                document.querySelector('[data-tab="logo-tab"]').click();
            });
            
            nameList.appendChild(nameItem);
        });
        
        nameResults.style.display = 'block';
    }
    
    // Logo generator
    const generateLogoBtn = document.getElementById('generateLogoBtn');
    const logoGallery = document.getElementById('logoGallery');
    const logoResults = document.getElementById('logoResults');
    
    generateLogoBtn.addEventListener('click', () => {
        const brandName = document.getElementById('brandName').value;
        const logoStyle = document.getElementById('logoStyle').value;
        
        if (!brandName) {
            alert('Please enter a brand name');
            return;
        }
        
        // Simulate loading
        generateLogoBtn.disabled = true;
        generateLogoBtn.textContent = 'Generating...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            generateLogos(brandName, logoStyle, selectedColor);
            generateLogoBtn.disabled = false;
            generateLogoBtn.textContent = 'Generate Logo';
        }, 1500);
    });
    
    function generateLogos(brandName, style, color) {
        logoGallery.innerHTML = '';
        
        const styles = {
            minimal: {
                font: 'sans-serif',
                weight: '600',
                transform: 'none'
            },
            modern: {
                font: 'sans-serif',
                weight: '700',
                transform: 'uppercase'
            },
            vintage: {
                font: 'serif',
                weight: '600',
                transform: 'none'
            },
            handwritten: {
                font: 'cursive',
                weight: '400',
                transform: 'none'
            },
            '3d': {
                font: 'sans-serif',
                weight: '700',
                transform: 'uppercase'
            }
        };
        
        const selectedStyle = styles[style];
        
        // Generate 6 logo variations
        for (let i = 0; i < 6; i++) {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            
            const logoPreview = document.createElement('div');
            logoPreview.className = 'logo-preview-small';
            
            // Apply different color variations
            let bgColor;
            if (i % 3 === 0) {
                bgColor = color;
            } else if (i % 3 === 1) {
                bgColor = lightenColor(color, 20);
            } else {
                bgColor = darkenColor(color, 10);
            }
            
            logoPreview.style.background = bgColor;
            logoPreview.style.color = getContrastColor(bgColor);
            logoPreview.style.fontFamily = selectedStyle.font;
            logoPreview.style.fontWeight = selectedStyle.weight;
            logoPreview.style.textTransform = selectedStyle.transform;
            
            if (style === '3d') {
                logoPreview.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            }
            
            // Shorten name if too long
            const displayName = brandName.length > 12 ? 
                brandName.substring(0, 10) + '...' : brandName;
            
            logoPreview.textContent = displayName;
            
            const logoActions = document.createElement('div');
            logoActions.className = 'logo-actions';
            
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'btn-primary';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
            
            const customizeBtn = document.createElement('button');
            customizeBtn.className = 'btn-secondary';
            customizeBtn.innerHTML = '<i class="fas fa-edit"></i> Customize';
            
            logoActions.appendChild(downloadBtn);
            logoActions.appendChild(customizeBtn);
            
            logoItem.appendChild(logoPreview);
            logoItem.appendChild(logoActions);
            
            logoGallery.appendChild(logoItem);
        }
        
        logoResults.style.display = 'block';
    }
    
    // Brand name input updates logo preview
    const brandNameInput = document.getElementById('brandName');
    brandNameInput.addEventListener('input', function() {
        document.getElementById('logoText').textContent = this.value || 'YourBrand';
    });
    
    // Helper functions
    function lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        
        return '#' + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }
    
    function darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        
        return '#' + (
            0x1000000 +
            (R > 0 ? R < 255 ? R : 255 : 0) * 0x10000 +
            (G > 0 ? G < 255 ? G : 255 : 0) * 0x100 +
            (B > 0 ? B < 255 ? B : 255 : 0)
        ).toString(16).slice(1);
    }
    
    function getContrastColor(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black or white depending on luminance
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
});
