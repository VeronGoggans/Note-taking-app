class PriorityStyles {

    static style(priorityType, item) {
        if (priorityType === 'None') this.none(item);
        if (priorityType === 'Low') this.low(item);
        if (priorityType === 'Medium') this.medium(item);
        if (priorityType === 'High') this.high(item);
        if (priorityType === 'Crucial') this.crucial(item);
    }
    
    static none(item) {
        item.classList.add('none')
    }
    
    static low(item) {
        item.classList.add('low')
    }
    
    static medium(item) {
        item.classList.add('medium')
    }
    
    static high(item) {
        item.classList.add('high')
    }
    
    static crucial(item) {
        item.classList.add('crucial')
    }
}

