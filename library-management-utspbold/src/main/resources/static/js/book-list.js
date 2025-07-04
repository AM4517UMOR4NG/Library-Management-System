function confirmDelete() {
    return confirm('Apakah Anda yakin ingin menghapus buku ini?');
}

// Optional: Animasi untuk rows dengan delay
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('tr').forEach((row, index) => {
        row.style.animationDelay = (index * 0.1) + 's';
    });

    // Efek hover yang lebih halus
    document.querySelectorAll('tr').forEach(row => {
        row.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.01)';
            this.style.zIndex = '1';
        });
        row.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '0';
        });
    });
}); 