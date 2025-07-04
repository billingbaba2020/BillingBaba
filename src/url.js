// const devUrl1 = "https://bilingbaba-backend.onrender.com/";
const devUrl1 = "https://api-bilingbaba.onrender.com/";
// const devUrl1 = "https://psychic-dollop-p9gr5v9xrqx2994g-9000.app.github.dev";
const devUrl2 = "http://127.0.0.1:9000/";

async function getDevUrl() {
  try {
    const response = await fetch(devUrl2, { method: "GET" });
    if (response.ok) {
      console.warn("running on Test Envoirnment");
      return devUrl2;
    } else {
      throw new Error("Second URL not reachable");
    }
  } catch (error) {
    console.warn("running on production envoirnment");
    return devUrl1;
  }
}

const dev_url = await getDevUrl();

export default dev_url;
