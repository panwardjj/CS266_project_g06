import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactModal from "react-modal";
import calendarURLGen from "../../Utils/calendar";
import Countdown from "../Countdown/Countdown";

import {
  faPlusCircle,
  faPlayCircle,
  faCheckDouble,
  faCalendarCheck,
  faTrash,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

// import Todos from '../Todos/Todos';
import Modal from "../Modal/Modal";
import TagModal from "../Modal/TagModal"; // Update the path based on your project structure

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  ...draggableStyle,
});

function Quote({
  quote,
  index,
  markTodoDone,
  bgColor,
  deleteTodo,
  setTimerValues,
  setTags,
  setShowTagModal,
}) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="pt-3"
        >
          <div
            className={`mx-2 rounded-lg bg-${bgColor}-500 hover:bg-${bgColor}-600 transition duration-200 text-white py-1 grid grid-cols-3 items-center todo-reveal`}
          >
            <div className="px-2 text-xl col-span-2">
              {quote.content}
              {quote.tags && quote.tags.length > 0 && (
                <div className="tags">
                  {quote.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="tag bg-white text-black rounded-md p-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-around items-center">
              <div
                className={`text-${bgColor}-400 cursor-pointer hover:text-green-300 tooltip`}
                onClick={() => {
                  setShowTagModal(true);
                  setTags(quote);
                }}
              >
                <FontAwesomeIcon icon={faTag} size="2x" />
                <span className="tooltiptext">Set tags</span>
              </div>
              <div
                className={`text-${bgColor}-400 cursor-pointer hover:text-green-300 tooltip`}
                onClick={() => {
                  markTodoDone(quote);
                }}
              >
                <FontAwesomeIcon icon={faCheckDouble} size="2x" />
                <span className="tooltiptext">Mark as done</span>
              </div>
              <a
                href={calendarURLGen(quote)}
                target="_blank"
                rel="noreferrer"
                className={`text-${bgColor}-400 hover:text-indigo-300 tooltip`}
              >
                <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
                <span className="tooltiptext">Add to calender</span>
              </a>
              <div
                className={`text-${bgColor}-400 cursor-pointer hover:text-gray-300 tooltip`}
                onClick={() => {
                  setTimerValues(quote);
                }}
              >
                <FontAwesomeIcon icon={faPlayCircle} size="2x" />
                <span className="tooltiptext">Start timer</span>
              </div>
              <div
                className={`text-${bgColor}-400 cursor-pointer hover:text-black tooltip`}
                onClick={() => {
                  deleteTodo(quote);
                }}
              >
                <FontAwesomeIcon icon={faTrash} size="2x" />
                <span className="tooltiptext">Delete</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

const TodoList = React.memo(function QuoteList({
  quotes,
  bgColor,
  markTodoDone,
  deleteTodo,
  setTimerValues,
  setTags, // Pass setTags prop
  currentTodo, // Pass currentTodo prop
  setShowTagModal, // Pass setShowTagModal prop
}) {
  return quotes.map((quote, index) => (
    <Quote
      quote={quote}
      index={index}
      key={quote.id}
      markTodoDone={markTodoDone}
      deleteTodo={deleteTodo}
      bgColor={bgColor}
      setTimerValues={setTimerValues}
      setTags={setTags} // Pass setTags prop
      currentTodo={currentTodo} // Pass currentTodo prop
      setShowTagModal={setShowTagModal} // Pass setShowTagModal prop
    />
  ));
});

function TodoCard({
  bgColor,
  priority,
  addTodoToDB,
  markTodoToDB,
  deleteTodoToDB,
  allTodos,
}) {
  const [todosItems, setTodoItems] = useState(() => []);
  const [showModal, setShowModal] = useState(false);
  const [timerState, setTimerState] = useState({});
  const [showTagModal, setShowTagModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [tags, setTags] = useState(() => {
    const storedTags = localStorage.getItem("tags");
    return storedTags ? JSON.parse(storedTags) : [];
  });

  useEffect(() => {
    setTodoItems(() =>
      allTodos.filter((t) => t.priority === priority && !t.completed)
    );
  }, [allTodos, priority]);

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      todosItems,
      result.source.index,
      result.destination.index
    );

    setTodoItems(quotes);
  }

  const setTagsFunction = (todo, newTags) => {
    const updatedTags = newTags || [];
    const updatedTodo = { ...todo, tags: updatedTags };
    const updatedTodos = allTodos.map((t) =>
      t.id === todo.id ? updatedTodo : t
    );
    setCurrentTodo(updatedTodo);
    setTodoItems(updatedTodos);
    setShowTagModal(true);
    setTags(updatedTags);
  };

  const markTodoDone = (todo) => {
    markTodoToDB(todo);
    setTodoItems((xtodos) => xtodos.filter((xtodo) => xtodo.id !== todo.id));
  };

  const deleteTodo = (todo) => {
    deleteTodoToDB(todo);
    setTodoItems((xtodos) => xtodos.filter((xtodo) => xtodo.id !== todo.id));
  };

  const giveUpFn = () => {
    setTimerState(() => {
      return {
        showTimer: false,
      };
    });
  };

  const completeFn = (todo) => {
    markTodoDone(todo);
    setTimerState(() => {
      return {
        showTimer: false,
      };
    });
  };

  const setTimerValues = (todo) => {
    setTimerState(() => {
      return {
        todo: todo,
        showTimer: true,
        giveUpFn: giveUpFn,
        completeFn: completeFn,
      };
    });
  };

  const addTodoItem = (content, priority, duration, schedule, isSchedule) => {
    const newId = (todosItems.length + 1).toString();
    if (!isSchedule) {
      schedule = "";
    }
    addTodoToDB({
      id: newId,
      content,
      priority,
      duration,
      schedule,
      isSchedule,
    });
    setTodoItems((xtodos) => [
      ...xtodos,
      {
        id: newId,
        content,
        priority,
        duration,
        schedule,
        isSchedule,
      },
    ]);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setShowTagModal(false);
  };

  const todoListItems = (
    <div className="h-full overflow-hidden relative">
      <div
        className={`bg-${bgColor}-200 h-full overflow-y-scroll relative rounded-lg`}
      >
        {showModal ? (
          <Modal
            {...{ priority, closeModalHandler, addTodoItem, setShowTagModal }}
          />
        ) : null}
        {showTagModal && (
          <TagModal
            todo={currentTodo}
            setTags={setTagsFunction}
            closeModal={() => setShowTagModal(false)}
            
          />
          
        )}
          
        <div className="mb-16">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TodoList
                    quotes={todosItems}
                    markTodoDone={markTodoDone}
                    deleteTodo={deleteTodo}
                    bgColor={bgColor}
                    setTimerValues={setTimerValues}
                    setTags={setTagsFunction}
                    currentTodo={currentTodo}
                    setShowTagModal={setShowTagModal}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <button
        className="absolute bottom-0 right-0 pb-3 pr-3 outline-none focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <div
          className={`rounded-full border border-${bgColor}-700 shadow-md hover:shadow-lg bg-white text-${bgColor}-700 transform transition duration-300 ease-in-out hover:scale-125`}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="3x" />
        </div>
      </button>
      <div>
        <ReactModal
          ariaHideApp={false}
          isOpen={timerState.showTimer}
          contentLabel="Minimal Modal Example"
        >
          <Countdown
            todo={timerState.todo}
            giveUpFn={timerState.giveUpFn}
            completeFn={timerState.completeFn}
          />
        </ReactModal>
      </div>
    </div>
  );

  return todoListItems;
};

export default TodoCard;

/*
{
    id,
    content,
    priority,
    duration,
    scheduleStart,
    scheduleEnd
}
[
  {
    "name": "State",
    "value": [

    ],
    "subHooks": []
  },
  {
    "name": "State",
    "value": false,
    "subHooks": []
  }
]

*/
