<script setup lang="ts">
const { url } = useCldImageUrl({
  options: {
    src: 'cld-sample-5.jpg',
    tint: '40:253f8c',
    underlay: 'cld-sample-4.jpg',
    overlays: [
      {
        position: {
          gravity: 'south',
          y: 60
        },
        text: {
          color: 'rgb:52a4ff80',
          fontFamily: 'Source Sans Pro',
          fontSize: 320,
          fontWeight: 'black',
          text: 'WoW!',
          letterSpacing: -10,
          lineSpacing: -100,
          stroke: true,
          border: '20px_solid_rgb:2d0eff99'
        }
      }
    ]
  }
});
</script>

<template>
  <div>
    <figure>
      <NuxtImg
        :src="url"
        alt="A stock image of a white sneaker with a stylized 'wow' overlayed."
      />
      <figcaption>
        This is just temporary. Using Cloudinary for image storage and delivery.
      </figcaption>
    </figure>
  </div>
</template>

<style scoped></style>
