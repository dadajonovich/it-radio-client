import { boot } from 'quasar/wrappers';
import helpers from '@/utils/helpers';
import VueScrollmagic from 'scrollmagic';
import 'vue-final-modal/style.css';
import { VueFinalModal } from 'vue-final-modal';
import { plugin, defaultConfig, createInput } from '@formkit/vue';
import { ru } from '@formkit/i18n';
import maskaInput from '@/components/inputs/maska-input';
import toggle from '@/components/inputs/toggle';

import { vMaska } from 'maska/vue';

export default boot(async ({ app, router }) => {
  app.config.globalProperties.$router = router;
  app.use(helpers);
  app.scrollMagic = VueScrollmagic;
  app.component('VueFinalModal', VueFinalModal);
  app.config.globalProperties.$scrollMagic = VueScrollmagic;
  app.directive('Maska', vMaska);

  const confFormKit = {
    locales: { ru },
    locale: 'ru',
    config: {
      validationVisibility: 'submit',
      classes: {
        outer: '$reset field',
        wrapper: '$reset field__inner',
        label: '$reset field__label',
        help: '$reset field__help',
        inner: '$reset field__input',
        input: '$reset input',
        messages: '$reset field__comment',
        message: '$reset field__comment-item',
        legend: '$reset field__legend',
        fieldset: '$reset field__fieldset',
        options: '$reset field__options',
        option: '$reset field__option',
        decorator: '$reset field__decorator',
      },
    },
    messages: {
      ru: {},
    },
    inputs: {
      maska: createInput(maskaInput, {
        props: ['maska', 'placeholder', 'disabled', 'readonly'],
      }),
      toggle: createInput(toggle, {
        props: ['placeholder', 'disabled', 'readonly'],
      }),
    },
  };
  app.use(plugin, defaultConfig(confFormKit));
});
