# dev-BE

```js
fetch('/api/word', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		word: {
			english: '밍구',
			korean: '밍구',
			pronounce: 'hi',
			description: '인사',
		},
	}),
})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error));
```

```json
{
	"word": {
		"english": "밍구",
		"korean": "밍구",
		"pronounce": "hi",
		"description": "인사"
	}
}
```
