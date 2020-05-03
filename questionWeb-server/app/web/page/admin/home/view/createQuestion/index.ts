import { Vue, Component } from 'vue-property-decorator';
@Component({
  components: {
  }
})
export default class CreateQuestion extends Vue {
    private created () {
        console.log('createquestion page')
    }
}