import { useState, useEffect } from "react";

// put all functions here for now
export function Footers() {
    return (
        <footer className="footer-container">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="#">Oscar Godson</a></p>
        <p>Refactored by <a href="#">Christoph Burgmer</a></p>
        <p>Maintenanced by the TodoMVC team</p>
        Part of <a href="#">TodoMVC</a>
        </footer>
      );
}

export function Headers() {
    return (
        <h1 className="header-container">todos</h1>
    );
}

export function InputTextBox() {
    // set initial value of todoItems
    const [todoItems, setItems] = useState([]);
    const [value, setValue] = useState("");

    // create another state for completed stuff 
    const [completedItems, setCompleted] = useState([]);

    // set a boolean to display completed/active items when user clicks button
    const [showAll, setShowAll] = useState(true);
    const [showDone, setShowDone] = useState(false);
    const [showActive, setShowActive] = useState(false);

    // create a state to hide/display the arrow symbol + radio buttons 
    const [showBox, setShowBox] = useState(false);

    // this one is for displaying the Clear completed button when >= 1 item is checked
    const [showClear, setShowClear] = useState(false);

    const addToList = (event) => {
        if (event.key == 'Enter' && event.target.value.trim() != "") {
            setItems([...todoItems, {"todos": event.target.value, "completed": false}])

            // display the arrow here
            setShowBox(true);

            // reinitialize to empty string so that value is null
            setValue('');
        };
    };

    const handleCheckboxChange = (event, index) => {

        // assign a temp variable to hold todoItems 
        let tempItems = todoItems;
        tempItems[index].completed = event.target.checked;
        setItems(tempItems);

        let finishedItem = tempItems.filter(item => item?.completed);
        console.log("Finished: ", finishedItem)
        setCompleted(finishedItem);
        console.log("Completed array: ", completedItems) // its not updating properly here, not sure if its getting mutated or smth
    };
    
    // for deleting items individually
    const deleteItem = (index) => {
        const updatedItems = todoItems.filter((_, idx) => idx !== index);
        setItems(updatedItems); // this creates a new array with only the elements with the indices that dont match
    };

    const showCompleted = () => {
        setShowDone(true);
        setShowActive(false);
        setShowAll(false);
    };

    const showRemaining = () => {
        setShowDone(false);
        setShowActive(true);
        setShowAll(false);
        setShowClear(false); // this is reset to false each time this is called
    };

    const showEverything = () => {
        setShowDone(false);
        setShowActive(false);
        setShowAll(true);
    };

    const clearDone = () => {
        setShowDone(false);
        setShowActive(true);
        setShowAll(false);
        setShowClear(false); // this is reset to false each time this is called

        // hide everything when user clicks on Clear completed and all items displayed are checked
        if (todoItems.length == completedItems.length) {
            setShowBox(false);
        }
    };

    useEffect(() => {
        if (todoItems.length > 0) {
            setShowBox(true);
        } 
        
        if (todoItems.length <= 0) {
            setShowBox(false);
        }

    }, [todoItems]);

    useEffect(() => {
        if (completedItems.length > 0) {
            setShowClear(true);
        } 
        
        if (completedItems.length <= 0) {
            setShowClear(false);
        }  

    }, [completedItems]);

    return (
        <div>
            {showBox && <span className="arrow-symbol">^</span>}
            <input
                type="text"
                className="text-container"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={addToList}
                placeholder="What needs to be done?"
                value={value}
            />
            <label>
                {todoItems.map(
                    (item, index) => 
                        <div
                            className="list-container"
                            id={index} // so we know which specific item we're getting
                            style={{ display: (showDone && item.completed) || (showActive && !item.completed) || showAll ? 'block' : 'none' }}
                        >
                            <span className="checkmark"></span>
                            <span className={item.completed && 'tickmark'}></span>
                            <input
                            type="checkbox"
                            className='check-container' //issue with key (must start by finding item then get its unique key and update the object based on its unique key)
                            onChange={(event) => handleCheckboxChange(event, index)}
                            />
                            <label style={{ textDecorationLine: item.completed ? 'line-through' : 'none', color: item.completed ? '#A0A0A0' : 'inherit' }}>{item.todos}</label>
                            <span className="delete-button"><a className="a-container" href="#" onClick={() => deleteItem(index)}>x</a></span>
                        </div> 
                )}
            </label>
            {showBox && <OptionButtons counts={todoItems.length - completedItems.length} showAll={showEverything} 
            showActive={showRemaining} showComplete={showCompleted} showClear={showClear} clearChecked={clearDone}/>}
        </div>
    );     
}

// get the radio buttons for selecting the specific items to display/delete
export function OptionButtons({counts, showAll, showActive, showComplete, showClear, clearChecked}) {

    return (
        <div className="button-container">
            <span style={{paddingLeft: '8px'}}>{0 || counts} item left</span>
            <button type="radio" name="radioElements" className="btn-item" onClick={showAll}>All</button>
            <button type="radio" name="radioElements" className="btn-item" onClick={showActive}>Active</button>
            <button type="radio" name="radioElements" className="btn-item" onClick={showComplete}>Completed</button>
            {showClear && <span className="btn-clear" onClick={clearChecked}>Clear completed</span>} 
        </div>
    );
}




