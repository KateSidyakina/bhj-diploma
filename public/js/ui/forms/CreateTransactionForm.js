/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectList = this.element.querySelector('select');
    const userInfo = User.current();

    if (userInfo && selectList) {
      Account.list({user_id: userInfo.id}, (err, response) => {
        if (response.success === true) {
          const result = response.data;
          selectList.innerHTML = '';

          for (let account of result) {
            selectList.insertAdjacentHTML('beforeend', `<option value="${account.id}">${account.name}</option>`);
          }
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success === true) {
        if (this.element.id === 'new-income-form') {
          App.getForm('createIncome').element.reset();
          App.getModal('newIncome').close();
        } else if (this.element.id === 'new-expense-form') {
          App.getForm('createExpense').element.reset();
          App.getModal('newExpense').close();
        }
        App.update();
      }
    });
  }
}