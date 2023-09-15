<template>
    <section class="page">
  
      <div class="container">
        <div class="row mt-8">
          <div class="col-auto">
            <Logo type="white" />
            <CodeLine :number="'404'" class="mt-5 mt-lg-7 mb-5">
              <span class="code--purple">error:</span>
              <span class="code--yellow">&nbsp;page</span>
              <span class="code--green">&nbsp;not</span>
              <span class="code--white">&nbsp;found</span>
            </CodeLine>
            <h1 class="mb-5 lead">OH SH***T;</h1>
            <p class="text-light mb-6">
              Looks you've navigated to a broken link.<br><em>Try not doing that again in the future.</em>
            </p>
            <ActionButton to="/" data-aos="fade-up">
              <i class="fa-sharp fa-solid fa-arrow-up-left"></i>
              Back
            </ActionButton>
            <div class="container">
  <p class="glitch">
    <span aria-hidden="true">codepen</span>
    codepen
    <span aria-hidden="true">codepen</span>
  </p>
</div>
          </div>
        </div>
      </div>
  
    </section>
  </template>

  <script setup lang="ts">
    import ActionButton from "@/components/ActionButton.vue"
    import CodeLine from "@/components/CodeLine.vue"
    import Logo from "@/components/Logo.vue"
</script>
  
  <style lang="scss" scoped>
  
  
.container {
  text-align: center;
}

.glitch {
  font-size: 5rem;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
    0.025em 0.04em 0 #fffc00;
  animation: glitch 725ms infinite;
}

.glitch span {
  position: absolute;
  top: 0;
  left: 0;
}

.glitch span:first-child {
  animation: glitch 500ms infinite;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  transform: translate(-0.04em, -0.03em);
  opacity: 0.75;
}

.glitch span:last-child {
  animation: glitch 375ms infinite;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  transform: translate(0.04em, 0.03em);
  opacity: 0.75;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
      0.025em 0.04em 0 #fffc00;
  }
  15% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
      0.025em 0.04em 0 #fffc00;
  }
  16% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
      -0.05em -0.05em 0 #fffc00;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
      -0.05em -0.05em 0 #fffc00;
  }
  50% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
      0 -0.04em 0 #fffc00;
  }
  99% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
      0 -0.04em 0 #fffc00;
  }
  100% {
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
      -0.04em -0.025em 0 #fffc00;
  }
}

  .lead {
    color: #F2F2F2;
    width: 740px;
    text-shadow: 0 22px 30px rgba(0, 0, 0, 0.4), 2px 2px 1px rgba(206, 89, 55, 0);
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  </style>
  