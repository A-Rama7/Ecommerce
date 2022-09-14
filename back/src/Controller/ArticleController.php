<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\ArticleRepository;
use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;


class ArticleController extends AbstractController
{

  /*--------------------*\
    CREATE
  \*--------------------*/

  #[Route(path: '/articles/create', name: 'create_article', methods: 'POST')]
  public function createArticles(Request $request, ManagerRegistry $doctrine) {
    $data = json_decode($request->getContent());
    $article = new Article();
    $article->setName($data->name);
    $article->setPrice($data->price);
    $article->setDescription($data->description);
    $article->setFeature($data->feature);
    $article->setImage($data->image);
    $article->setViewCount($data->view_count);
    $article->setQuantity($data->quantity);
    $article->setCategoryId($data->category_id);
    $article->setRecommendation($data->recommendation);
    $article->setReduction($data->reduction);
    $article->setLength($data->length);
    $article->setWidth($data->width);
    $article->setHeight($data->height);
    $article->setWeight($data->weight);
    $article->setPhone($data->phone);
    $article->setZip($data->zip);
    $article->setState($data->state);
    $article->setCity($data->city);
    $article->setStreet($data->street);
    $article->setNewRelease($data->new_release);
    if (isset($data->quantity)) {
      $article->setQuantity($data->quantity);
    } else $article->setQuantity(0);
    $entityManager = $doctrine->getManager();
    $entityManager->persist($article);
    $entityManager->flush();
    $id = $article->getId();
    return new Response($id, 201);
  }

  /*--------------------*\
    READ
  \*--------------------*/

  #[Route(path: '/articles/read', name: 'get_articles', methods: 'GET')]
  public function showArticles(ArticleRepository $articleRepository): Response
  {
    $articles = $articleRepository->findAll();
    $encoders = [new JsonEncoder()];
    $normalizers = [new ObjectNormalizer()];
    $serializer = new Serializer($normalizers, $encoders);
    $jsonContent = $serializer->serialize(
      $articles,
      "json",
      [
        "circular_reference_handler" => function ($object) {
          return $object->getId();
        }
      ]
    );
    $response = new Response($jsonContent);
    $response->headers->set("Content-Type", "application/json");
    return $response;
  }

  #[Route(path: '/articles/read/{id}', name: 'get_article', methods: 'GET')]
  public function getArticle(Article $article)
  {
    $encoders = [new JsonEncoder()];
    $normalizers = [new ObjectNormalizer()];
    $serializer = new Serializer($normalizers, $encoders);
    $jsonContent = $serializer->serialize(
      $article,
      "json",
      [
        "circular_reference_handler" => function ($object) {
          return $object->getId();
        }
      ]
    );
    $response = new Response($jsonContent);
    $response->headers->set("Content-Type", "application/json");
    return $response;
  }

  /*--------------------*\
    UPDATE
  \*--------------------*/

  #[Route(path: '/articles/update/{id}', name: 'edit_article', methods: 'PUT')]
  public function editArticles(?Article $article, Request $request, ManagerRegistry $doctrine)
  {
    $data = json_decode($request->getContent());
    $code = 200;
    if (!$article) {
      $article = new Article();
      $code = 201;
    }
    $article->setName($data->name);
    $article->setPrice($data->price);
    $article->setDescription($data->description);
    $article->setFeature($data->feature);
    $article->setImage($data->image);
    $article->setViewCount($data->view_count);
    $article->setQuantity($data->quantity);
    $article->setCategoryId($data->category_id);
    $article->setRecommendation($data->recommendation);
    $article->setReduction($data->reduction);
    // $article->setLength($data->length);
    // $article->setWidth($data->width);
    // $article->setHeight($data->height);
    // $article->setWeight($data->weight);
    // $article->setPhone($data->phone);
    // $article->setZip($data->zip);
    // $article->setState($data->state);
    // $article->setCity($data->city);
    // $article->setStreet($data->street);
    // $article->setNewRelease($data->new_release);
    // $article->setNewRelease($data->new_release);

    $entityManager = $doctrine->getManager();
    $entityManager->persist($article);
    $entityManager->flush();
    return new Response("Done", $code);
  }

  /*--------------------*\
    DELETE
  \*--------------------*/

  #[Route(path: '/articles/delete/{id}', name: 'delete_article', methods: 'DELETE')]
  public function deleteArticle(Article $article, ManagerRegistry $doctrine)
  {
    $entityManager = $doctrine->getManager();
    $entityManager->remove($article);
    $entityManager->flush();
    return new Response("Done");
  }


  /*--------------------*\
   QUANTITY -1
  \*--------------------*/

  #[Route(path: 'articles/quantity/{id}', name: 'quantity_article', methods: 'POST')]

  public function quantityArticle(ArticleRepository $repository, EntityManagerInterface $manager, int $id)
  {

    $repo = $repository->findOneBy(['id' => $id]);

    if ($repo) {
      if ($repo->getQuantity() <= 0) {
        $repo->setQuantity(0);
        $manager->persist($repo);
        $manager->flush();
      } else {
        $repo->setQuantity($repo->getQuantity() - 1);
        $manager->persist($repo);
        $manager->flush();
      }
      return $this->json($repo);
    } else {
      return $this->json("id undifined");
    }
  }

  /*--------------------*\
   QUANTITY +1
  \*--------------------*/

  #[Route(path: 'articles/PlusQuantity/{id}', name: 'Plus_quantity_article', methods: 'POST')]

  public function PlusQuantityArticle(ArticleRepository $repository, EntityManagerInterface $manager, int $id)
  {

    $repo = $repository->findOneBy(['id' => $id]);

    if ($repo) {

      $repo->setQuantity($repo->getQuantity() + 1);
      $manager->persist($repo);
      $manager->flush();
      return $this->json($repo);
    } else {
      return $this->json("id undifined");
    }
  }

  /*--------------------*\
     NO QUANTITY 
  \*--------------------*/

  #[Route(path: 'articles/NoQuantity/{id}', name: 'NoQuantity_article', methods: 'POST')]

  public function NoQuantity(ArticleRepository $repository, EntityManagerInterface $manager, int $id)
  {

    $repo = $repository->findOneBy(['id' => $id]);

    if ($repo) {
      $repo->setQuantity(0);
      $manager->persist($repo);
      $manager->flush();
      return $this->json($repo);
    } else {
      return $this->json("id undifined");
    }
  }
}