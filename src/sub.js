export const todoApp = () => {
    // 入力したTodoタスクの一覧を保持する配列を定義
    const todoList = [];

    // 各DOM要素を取得
    const inputBox      = document.getElementById('input-todo-box');
    const addButton     = document.getElementById('add-button');
    const listContainer = document.getElementById('todo-list');

    // テキストボックスに入力されたテキストをTodoリスト一覧に追加
    addButton.addEventListener('click', () => {
        const todo     = inputBox.value;
        inputBox.value = '';

        if (todo) {
            todoList.push(todo);
            showTodoList();
        }
    });

    // 「todoList」の中身を一覧表示
    function showTodoList() {
        // ul要素内を中身を一旦空っぽにして、現在のTodoリスト一覧を再度表示する
        while (listContainer.firstChild) {
            listContainer.removeChild(listContainer.firstChild);
        }

        // todoListの情報を使ってTodoリストを作成
        todoList.forEach((todo, index) => {
            // 各要素を取得
            const todoItem = document.createElement('div');
            todoItem.classList.add('card');
            listContainer.appendChild(todoItem);

            const bodyItem = document.createElement('div');
            bodyItem.classList.add('card-body');
            todoItem.appendChild(bodyItem);

            const textItem = document.createElement('div');
            textItem.classList.add('card-text');
            bodyItem.appendChild(textItem);

            // 削除ボタン
            const deleteButton = document.createElement('a');
            deleteButton.classList.add('btn');
            deleteButton.classList.add('btn-outline-danger');
            deleteButton.setAttribute('href', '#');
            deleteButton.textContent = '削除';
            deleteButton.addEventListener('click', () => {
                deleteTodo(index);
            });
            textItem.appendChild(deleteButton);

            // テキストをセットする
            const textInnerItem = document.createElement('span');
            const taskNumber    = index + 1;
            textInnerItem.classList.add('ml-3');
            textInnerItem.textContent = `${taskNumber} : ${todo}`;
            textItem.appendChild(textInnerItem);
        });
    }

    // todoListから対応するtodo情報を削除
    function deleteTodo(index) {
        todoList.splice(index, 1);
        showTodoList();
    }
};