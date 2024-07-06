export default function UserClickPost(imageId) {
    console.log(imageId, 'this is imageid in userclickpost')
    async function sendUserClicks() {
        const url = `http://localhost:3000/image/${imageId}`
        console.log(url, 'this is url')
    }
    sendUserClicks()
}