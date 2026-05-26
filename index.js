const fs=require('fs')
const{Command}=require('commander')
const program=new Command()

program
     .name('todo')
     .description('A CLI todo list')
     .version('1.0.0')


     program.command('add')
            .description('Add a new todo')
            .argument('<task>','Task to add')
            .action((task)=>{
                const todos=JSON.parse(fs.readFileSync('todos.json','utf-8'))
                todos.push({id:todos.length+1,task:task,done:false})
                fs.writeFileSync('todos.json',JSON.stringify(todos))
                console.log(`Added todo:${task}`)
            })

    program.command('delete')
          .description('delete existing todos')
          .argument('<id>','id to delete')
          .action((id)=>{
              const todos=JSON.parse(fs.readFileSync('todos.json','utf-8'))
              const updated=todos.filter((todo)=>todo.id!==Number(id))
              fs.writeFileSync('todos.json',JSON.stringify(updated))
              console.log(`delete todo with id=${id}`)
          })
    
    program.command('done')
           .description('mark task as done')
           .argument('<id>','id to done')
           .action((id)=>{
               const todos=JSON.parse(fs.readFileSync('todos.json','utf-8'))
               const updated=todos.map((todo)=>{
                     if(todo.id===Number(id)){
                        todo.done=true;
                     }
                     return todo
               })
               fs.writeFileSync('todos.json',JSON.stringify(updated))
               console.log(`Task is completed with id=${id}`)
           })
    
program.parse()