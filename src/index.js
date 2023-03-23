import { intro, outro, text } from '@clack/prompts'


intro('Hello World')


await text({
    message: 'What is your name?',
    placeholder: 'John Doe',
})

outro('Goodbye World')