const express = require("express")
const {
	getAllMonkeys,
	getMonkeyByName,
	createMonkey
} = require("./model/model")
const app = express()


const port = 3000
app.use(express.json())


app.get("/", (req, res) => {
	res.status(200).send({
		msg: "this is working"
	})
})

app.get("/monkey", async (req, res) => {
	const name = req.query.name
	if(!name) {
		res.status(400).send({
			msg: "Need a name"
		})
		return
	}
	try {
		if (name === "all") {
			const monkey = await getAllMonkeys()
			if (monkey.length === 0) {
				res.status(404).send({
					msg: "No monkey found"
				})
				return
			}
			res.status(200).send({
				monkey: monkey
			})
			return
		}

		const monkey = await getMonkeyByName(name)
		if (!monkey) {
			res.status(404).send({
				msg: "No monkey found"
			})
			return
		}
		res.status(200).send({
			monkey: monkey
		})

	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})

app.post("/monkey", async (req, res) => {
	const name = req.body.name
	if (!name) {
		res.status(400).send({
			msg: "Need a name"
		})
		return
	}
	try {
		await createMonkey(name)
		res.status(201).send({
			msg: "Monkey created",
		})
	} catch (error) {
		res.status(500).send({
			msg: "Internal Server Error"
		})
	}
})


app.listen(port, () => {
	console.log(`Server is listening on port ${port}`)
})

