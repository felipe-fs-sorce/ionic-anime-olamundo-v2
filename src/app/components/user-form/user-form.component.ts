import { Component, OnInit } from '@angular/core';

// Importa bibliotecas do formulário
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Importa o service da API
import { UsersService } from 'src/app/services/users.service';

// Importa roteamento
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-userform',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserformComponent implements OnInit {

  // Criando formulário
  public userForm: FormGroup;

  constructor(
    // Construtor do ReactiveForms ^^^^ 3 import ^^^^
    private formBuilder: FormBuilder,

    // Inicializa service da API
    private usersService: UsersService,

    // Roteamento
    public navCtrl: NavController
  ) {

    // Definindo campos do formulário
    this.userForm = this.formBuilder.group(
      {
        // Campo 'id'
        id: [null],

        // Campo 'name'
        name: [                     // Nome do campo
          'Joca da Silva',          // Valor inicial 'null'
          Validators.compose([      // Regras de validação
            Validators.required,    // Campo obrigatório
            Validators.minLength(3) // Cumprimento mínimo
          ])
        ],

        // Campo 'email'
        email: [
          'joca@silva.com',
          Validators.compose([
            Validators.required,
            // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
            // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')
          ])
        ],

        // Campo 'avatar'
        avatar: [
          'https://picsum.photos/200',
          Validators.compose([
            Validators.required,
            // tslint:disable-next-line: max-line-length
            // Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
            // tslint:disable-next-line: max-line-length
            Validators.pattern(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i)
          ])
        ],

        // Campo 'status'
        status: [1]

      });
  }

  ngOnInit() { }

  // Método de submit do formulário
  onSubmit() {
    // console.log(this.userForm.value);

    // Se o campo id está vazio, estamos cadastrando um novo usuário
    if (this.userForm.value.id === null) {

      // Cadastra usuário //

      // Remove o campo id
      delete this.userForm.value.id;

      // Ajusta o valor do campo 'status' para numérico
      if (!this.userForm.value.status) {
        this.userForm.value.status = 0;
      } else {
        this.userForm.value.status = 1;
      }

      // Salvar dados na API
      this.usersService.postUser(this.userForm.value).subscribe(

        (res: any) => {

          // Se foi adicionado
          if (res.status === 'success') {

            // Feedback
            alert(`"${this.userForm.value.name}" foi adicionado com sucesso!\nClique em [Ok] para continuar...`);

            // Retorna para a listagem
            this.navCtrl.navigateForward('usuarios/todos');

            // Limpa o formulário
            // this.userForm.reset();
          }
        }
      );

    } else {

      // Editar usuário

    }
  }
}
