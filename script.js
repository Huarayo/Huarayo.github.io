const comment = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer = document.querySelector("#commets-container");

inputContainer.classList.add("start-input")
input.classList.add("input");

input.addEventListener("keydown", e => {
	handleEnter(e,null)
})

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handleEnter(e, current){

	if(e.key == "Enter" && e.target.value !== ""){
		const newComment = {
			text: e.target.value,
			likes: 0,
			responses: []
		}
		if(current === null){
			comment.unshift(newComment)
		}else{
			current.responses.unshift(newComment)
		}

		e.target.value = "";
		commentsContainer.innerHTML = "";
		commentsContainer.appendChild(inputContainer);

		console.log(comment)
		
		renderComments(comment,commentsContainer)
	} 
}

function renderComments(arr,parent){
	arr.forEach(element => {
		const commentsContainer = document.createElement("div");
		commentsContainer.classList.add("comment-container");

		const responsesContainer = document.createElement("div")
		responsesContainer.classList.add("responses-container");

		const replyButton = document.createElement("button");
		const likeButton = document.createElement("button");

		const textContainer = document.createElement("div");
		textContainer.classList.add("texto")
		textContainer.textContent = element.text;

		const actionsContainer = document.createElement("div");

		replyButton.textContent = "Reply";
		likeButton.textContent = `${element.likes > 0 ? `${element.like} likes` : "like"}`

		replyButton.addEventListener("click", e =>{

			const newInput = inputContainer.cloneNode(true);
			newInput.value = "";
			newInput.focus();
			newInput.addEventListener("keydown", e => {
				handleEnter(e,element)
			})
			commentsContainer.insertBefore(newInput, responsesContainer)

		})
		likeButton.addEventListener("click", e => {

			element.likes++;
			likeButton.textContent = 
			`${element.likes > 0 ? `${element.likes} likes` : "like "}`
		})


		//append

		commentsContainer.appendChild(textContainer);
		commentsContainer.appendChild(actionsContainer);
		actionsContainer.appendChild(replyButton);
		actionsContainer.appendChild(likeButton);

		commentsContainer.appendChild(responsesContainer);

		if(element.responses.length > 0){
			renderComments(element.responses , responsesContainer)
		}

		parent.appendChild(commentsContainer)
	})
}