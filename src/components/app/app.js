import React from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";

import "./app.css";

function onToggler(id, data, target) {
    const index = data.findIndex((elem) => elem.id === id);
    const old = data[index];
    const newItem = { ...old, [target]: !old.like };
    const newArray = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
    ];
    return newArray;
}

export default class App extends React.Component {
    state = {
        data: [
            {
                label: "Going to Learn React",
                important: false,
                like: false,
                id: 1,
            },
            { label: "That is so good", important: false, like: false, id: 2 },
            {
                label: "I need a break...",
                important: false,
                like: false,
                id: 3,
            },
        ],
        term: "",
        filter: "all",
    };
    maxId = 4;
    deleteItem = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex((elem) => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArray = [...before, ...after];

            return {
                data: newArray,
            };
        });
    };

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++,
        };
        this.setState(({ data }) => {
            return {
                data: [...data, newItem],
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({ data }) => {
            const index = data.findIndex((elem) => elem.id === id);
            const old = data[index];
            const newItem = { ...old, important: !old.important };
            const newArray = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1),
            ];

            return {
                data: newArray,
            };
        });
    };

    onToggleLike = (id) => {
        this.setState(({ data }) => {
            const Arrays = onToggler(id, data, "like");
            // const index = data.findIndex((elem) => elem.id === id);
            // const old = data[index];
            // const newItem = { ...old, like: !old.like };
            // const newArray = [
            //     ...data.slice(0, index),
            //     newItem,
            //     ...data.slice(index + 1),
            // ];

            return {
                data: Arrays,
            };
        });
    };

    onUpdateSearch = (term) => {
        this.setState({ term });
    };

    onFilterSelect = (filter) => {
        this.setState({ filter });
    };

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        });
    };

    filterPost = (items, filter) => {
        if (filter === "like") {
            return items.filter((item) => item.like);
        } else {
            return items;
        }
    };

    render() {
        const { data, term, filter } = this.state;
        const liked = data.filter((item) => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(
            this.searchPost(data, term),
            filter
        );

        return (
            <div className="app">
                <AppHeader liked={liked} allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                />
                <PostAddForm onAdd={this.addItem} />
            </div>
        );
    }
}
