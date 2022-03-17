<template>
    <div class="news">
        <div class="d-flex justify-content-around">
            <button class="btn btn-success my-3" v-if="statusStore.perms.admin" @click="initAddArticle()" ><i class="bi bi-plus-square"></i></button>
        </div>
        <div class="card mb-3" v-for="article in articles" :key="article.id">
            <div class="position-absolute w-100 admin-btns d-flex justify-content-end" v-if="statusStore.perms.admin">
                <button class="btn btn-success m-2" @click="initEditArticle(article)"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-danger m-2 ms-0" @click="deleteArticle(article.id)"><i class="bi bi-trash"></i></button>
            </div>
            <div class="card-body">
                <h4 class="card-title">{{ article.title }}</h4>
                <p style="white-space:pre-line;" class="card-text">{{ article.text }}</p>
            </div>
        </div>
        
        <div class="new-article popup m-0 p-0" v-if="popupState == -1">
            <div class=" container col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 m-0 p-0">
                <h2 class="popup-title px-3 py-4">
                    New Article
                </h2>
                <div class="popup-body px-3 pb-1 pt-2">
                    <div class="form-group mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="Title" v-model="popupTitle">
                    </div>
                    <div class="form-group mb-3">
                        <label for="text" class="form-label">Text</label>
                        <textarea class="form-control" id="text" placeholder="Text" rows="8" v-model="popupText"></textarea>
                    </div>
                </div>
                <div class="popup-buttons px-3 pt-3 pb-3">
                    <button type="button" class="btn btn-primary" @click="addArticle()">Add Article</button>
                    <button type="button" class="btn btn-secondary ms-2" @click="exitPopup()">Close</button>
                </div>
            </div>
        </div>

        <div class="new-article popup m-0 p-0" v-if="popupState >= 0">
            <div class=" container col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 m-0 p-0">
                <h2 class="popup-title px-3 py-4">
                    Edit Article
                </h2>
                <div class="popup-body px-3 pb-1 pt-2">
                    <div class="form-group mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" placeholder="Title" v-model="popupTitle">
                    </div>
                    <div class="form-group mb-3">
                        <label for="text" class="form-label">Text</label>
                        <textarea class="form-control" id="text" placeholder="Text" rows="8" v-model="popupText"></textarea>
                    </div>
                </div>
                <div class="popup-buttons px-3 pt-3 pb-3">
                    <button type="button" class="btn btn-primary" @click="editArticle()">Edit Article</button>
                    <button type="button" class="btn btn-secondary ms-2" @click="exitPopup()">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStatusStore } from "@/store/statusStore";

const statusStore = useStatusStore();

type Article = {
    id: number,
    title: string,
    text: string
}

let popupState = ref(-2);

let popupTitle = ref("");
let popupText = ref("");

const articles: Article[] = reactive([
    {
        id: 0,
        title: "New Website",
        text: "Like you probably noticed\n\n(epic pause)\n\nwe have done some work on our website!\nbyebye :)"
    },
    {
        id: 1,
        title: "Test3",
        text: "Blablablablablablablablablablablablabla"
    }
]);
let articleId = 1;

function exitPopup() {
    popupState.value = -2;
    popupTitle.value = "";
    popupText.value = "";
}

function initAddArticle() {
    popupState.value = -1;
    popupTitle.value = "";
    popupText.value = "";
}

function addArticle() {
    articleId++;
    articles.unshift({
        id: articleId,
        title: popupTitle.value,
        text: popupText.value
    });
    popupTitle.value = "";
    popupText.value = "";
    popupState.value = -2;
}

function initEditArticle(article: Article) {
    popupState.value = article.id;
    popupTitle.value = article.title;
    popupText.value = article.text;
}

function editArticle() {
    const idx = articles.findIndex(article => article.id === popupState.value);
    if (idx === -1) return;
    articles[idx].title = popupTitle.value;
    articles[idx].text = popupText.value;
    popupTitle.value = "";
    popupText.value = "";
    popupState.value = -2;
}

function deleteArticle(id: number) {
    const idx = articles.findIndex(article => article.id == id);
    if (idx == -1) return;
    articles.splice(idx, 1);
}

</script>

<style scoped lang="scss">
.popup {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    margin: auto;
    background-color: rgba(0,0,0,.5);
    
    > div {
        background-color: var(--bs-secondary);
        .popup-title, .popup-buttons {
            background-color: rgba(0,0,0,.2);
        }
    }

}
</style>