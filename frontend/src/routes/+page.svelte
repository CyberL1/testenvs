<script lang="ts">
import type { Container } from "$lib/types/Container";
import { onMount } from "svelte";

let containers: Container[] = [];
let loading: boolean = true;
let error: string | null = null;

onMount(async () => {
  try {
    const res = await fetch("/api/containers");
    if (!res.ok) {
      throw new Error("Failed to fetch containers");
    }

    containers = await res.json();
  } catch (e) {
    error = e.message;
  } finally {
    loading = false;
  }
});
</script>

{#if loading}
  <p>Loading containers...</p>
{:else if error}
  <p style="color: red;">Error: {error}</p>
{:else if containers.length === 0}
  <p>No containers found.</p>
{:else}
  <div>
    {#each containers as container}
      <a href={`/containers/${container.name}`}>{container.name}</a>
    {/each}
  </div>
{/if}
