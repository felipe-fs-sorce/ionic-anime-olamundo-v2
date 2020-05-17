import { Component, OnInit } from '@angular/core';

// Importa bibliotecas do formulário
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Importa o service da API
import { UsersService } from 'src/app/services/users.service';

// Importa roteamento
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-userform',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserformComponent implements OnInit {

  // Variável que contém o Id do usuário editado
  id = this.route.snapshot.paramMap.get('id');

  // Variável que verifica se não tem usuário a exibir
  noUser = false;

  // Criando formulário
  public userForm: FormGroup;

  constructor(
    // Construtor do ReactiveForms
    private formBuilder: FormBuilder,

    // Inicializa service da API
    private usersService: UsersService,

    // Roteamento
    public navCtrl: NavController,

    // Configura route
    private route: ActivatedRoute
  ) {

    // Definindo campos do formulário
    this.userForm = this.formBuilder.group(
      {
        // Campo 'id'
        id: [null],

        // Campo 'name'
        name: [                     // Nome do campo
          null,          // Valor inicial 'null'
          Validators.compose([      // Regras de validação
            Validators.required,    // Campo obrigatório
            Validators.minLength(3) // Cumprimento mínimo
          ])
        ],

        // Campo 'email'
        email: [
          null,
          Validators.compose([
            Validators.required,
            // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
            // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')
          ])
        ],

        // Campo 'avatar'
        avatar: [
          null,
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

  ngOnInit() {

    // Se temos um Id na rota...
    if (this.id) {

      // Consulta a API para o Id informado
      this.usersService.getUser(this.id).subscribe(

        // Obtém dados
        (res: any) => {

          // Se usuário não existe
          if (res.result === 'No record found') {

            // Feedback na página HTML
            this.noUser = true;

            // Sai sem fazer nada
            return false;

            // Se usuário existe
          } else {

            // Preenche o formulário com os dados do usuário
            this.userForm.controls.id.setValue(res.result.id);
            this.userForm.controls.name.setValue(res.result.name);
            this.userForm.controls.email.setValue(res.result.email);
            this.userForm.controls.avatar.setValue(res.result.avatar);

            // Converte status para number
            this.userForm.controls.status.setValue(parseInt(res.result.status, 10));
          }
        }
      );
    }
  }

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
            // tslint:disable-next-line: max-line-length
            if (confirm(`"${this.userForm.value.name}" foi adicionado com sucesso!\n\n    • Clique em [Ok] para listar usuários.\n    • Clique em [Cancel] para cadastrar outro usuário.`)) {

              // Retorna para a listagem
              this.navCtrl.navigateForward('usuarios/todos');
            } else {

              // Limpa o formulário para cadastrar outro ususário
              this.userForm.reset();
            }
          }
        }
      );

      // Se tem um Id, atualiza usuário
    } else {

      // Atualizando dados do usuário da API
      this.usersService.updateUser(this.userForm.value).subscribe(

        // Dados enviados
        (res: any) => {

          // Se atualizou...
          if (res.status === 'success') {

            // Feedback
            alert(`"${this.userForm.value.name}" atualizado com sucesso!\nClique em [Ok] para continuar...`);

            // Retornar para a listagem
            this.navCtrl.navigateForward(`usuarios/usuario/${this.userForm.value.id}${this.makeId()}`);
          }
        }
      );
    }
  }

  // Ação do botão "Listar ususários"
  listUsers() {
    this.navCtrl.navigateForward('usuarios/todos');
  }

  // Gerador de string aleatória para forçar "refresh" da página
  makeId() {
    let text = '';
    const characters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 7; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  }
 }