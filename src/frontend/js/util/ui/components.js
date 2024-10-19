export function createListItemType1(item, itemType) {
    const listItemCard = document.createElement('list-item-card-1');
    listItemCard.setAttribute('list-item', JSON.stringify(item));
    listItemCard.setAttribute('list-item-type', itemType);
    
    return listItemCard 
}