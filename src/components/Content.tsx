import styles from './Content.module.css'
import clipboard from '../assets/Clipboard.svg'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Trash } from 'phosphor-react'

export function Content() {
  const [valor, setValor] = useState('')
  const [toDos, setToDos] = useState([
    { key: 0, describe: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.', check: false },
    { key: 1, describe: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.', check: false },
    { key: 2, describe: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.', check: false },
    { key: 3, describe: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.', check: false },
    { key: 4, describe: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.', check: false },
  ])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value)
  }

  const handleCreateNewToDo = (event: FormEvent) => {
    event.preventDefault()
    setToDos([...toDos, { key: toDos.length + 1, describe: valor, check: false }])
    setValor('')
  }

  const indexToDo = (key: number) => {
    return toDos.map((toDo) => toDo.key).indexOf(key)
  }

  const handleChecked = (key: number) => {
    const index = indexToDo(key)
    toDos[index].check = !toDos[index].check
    setToDos([...toDos])
  }

  const handleDeleteToDo = (key: number) => {
    const index = indexToDo(key)
    toDos.splice(index, 1)
    setToDos([...toDos])
  }

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <form onSubmit={handleCreateNewToDo} className={styles.form}>
          <input className={styles.input} type='text' placeholder='Adicione uma nova tarefa' value={valor} onChange={handleChange} />
          <button type='submit'>Criar</button>
        </form>
        <div className={styles.list}>
          <div className={styles.headerList}>
            <span className={styles.created}>Tarefas criadas <span>{toDos.length}</span></span>
            <span className={styles.done}>Concluidas <span> {toDos.length === 0 ? toDos.length : `${toDos.filter((toDo) => toDo.check).length} de ${toDos.length}`}</span></span>
          </div>
          {toDos.length > 0 ?
            toDos.map((toDo) =>
              <div key={toDo.key} className={styles.toDo}>
                <label className={styles.labelContainer}>
                  <div className={toDo.check ? styles.toDoText : ''}>
                    {toDo.describe}
                  </div>
                  <input type="checkbox" checked={toDo.check} onChange={() => handleChecked(toDo.key)} />
                  <span className={styles.checkmark}></span>
                </label>
                <button className={styles.trash} onClick={() => handleDeleteToDo(toDo.key)} title="Deletar comentário">
                  <Trash size={18} />
                </button>
              </div>
            )
            :
            <div className={styles.contentList}>
              <div className={styles.message}>
                <div>
                  <img src={clipboard} sizes={'56'} />
                  <div className={styles.text}>
                    <p className={styles.title}>Você ainda não tem tarefas cadastradas</p>
                    <p className={styles.paragraph}>Crie tarefas e organize seus itens a fazer</p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}