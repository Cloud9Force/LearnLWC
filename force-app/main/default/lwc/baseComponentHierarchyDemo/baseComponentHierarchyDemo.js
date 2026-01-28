import { LightningElement } from 'lwc';
import {
    EXAMPLES_COLUMNS_DEFINITION_BASIC,
    EXAMPLES_DATA_BASIC,
    KEYFIELD,EXAMPLES_DATA_ICONS,EXAMPLES_COLUMNS_DEFINITION_ICON_SINGLE,
    EXAMPLES_COLUMNS_DEFINITION_ICON_SIDES
} from './sampleData';


export default class HierarchyDemo extends LightningElement {

    // ============================
    // TREE
    // ============================
    selectedItemValue;
    
    handleOnselect(event) {
        this.selectedItemValue = event.detail.name;
    }

    handleChangeSelected() {
        this.selectedItemValue = 'Engineering';
    }
    treeItems = [
        {
            label: 'CEO',
            name: 'CEO',
            expanded: true,
            metatext: 'Jane Dough',
            items: [
                {
                    label: 'Engineering',
                    name: 'Engineering',
                    metatext: 'Mechanical Engineering',
                    items: [
                        { label: 'Frontend Team', name: 'Frontend Team' },
                        { label: 'Backend Team', name: 'Backend Team' }
                    ]
                },
                {
                    label: 'Sales',
                    name: 'Sales',
                    metatext: 'New York Region',
                    items: [
                        { label: 'Domestic', name: 'Domestic' },
                        { label: 'International', name: 'International' }
                    ]
                }
            ]
        }
    ];
    handleClick(e) {
        const newItems = Array.from(this.treeItems);
        const branch = newItems.length;
        const label = `New item added at Record ${branch}`;
        const newItem = {
            label,
            name: label,
            expanded: true,
            disabled: false,
            items: []
        };
        newItems[branch - 1].items = [
            ...(newItems[branch - 1].items || []),
            newItem
        ];
        this.treeItems = newItems;
    }

    // ============================
    // TREE GRID
    // ============================
    // Local tree grid (first card)
    gridColumnsLocal = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Role', fieldName: 'role' }
    ];
    gridDataLocal = [
        {
            id: '1',
            name: 'Alice',
            role: 'Manager',
            _children: [
                { id: '1-1', name: 'Bob', role: 'Developer' },
                { id: '1-2', name: 'Carol', role: 'Developer' }
            ]
        }
    ];
    gridKeyFieldLocal = 'id';

    // Sample data tree grid (last card)
    gridColumns = EXAMPLES_COLUMNS_DEFINITION_BASIC;
    gridData = EXAMPLES_DATA_BASIC;
    gridKeyField = KEYFIELD;

    // single icon used for both collapsed and expanded states
    rowToggleIconSingle = { iconName: 'utility:right' };

    // different icons for expanded and collapsed states
    rowToggleIconStates = {
        expanded: {
            iconName: 'utility:add',
        },
        collapsed: {
            iconName: 'utility:dash',
        },
    };
    
    // Uses sampleData for gridColumns/gridData above.
    // Single icon example columns
    gridColumnsSingle = EXAMPLES_COLUMNS_DEFINITION_ICON_SINGLE;

    // Left and right icon example columns
    gridColumnsSides = EXAMPLES_COLUMNS_DEFINITION_ICON_SIDES;

    // Shared data for both examples
    gridData1 = EXAMPLES_DATA_ICONS;
}
