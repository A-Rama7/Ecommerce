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
use App\Repository\CategoryRepository;
use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;

class CategoryController extends AbstractController {

  /*--------------------*\
    CREATE
  \*--------------------*/

  #[Route(path: '/create/category', name: 'create_category', methods: 'POST')]
  public function createCategory(Request $request, ManagerRegistry $doctrine) {
    $data = json_decode($request->getContent());
    $category = new Category();
    $category->setName($data->name);
    $entityManager = $doctrine->getManager();
    $entityManager->persist($category);
    $entityManager->flush();
    return new Response("Done", 201);
  }

  /*--------------------*\
    READ
  \*--------------------*/

  #[Route(path: '/read/categories', name: 'read_categories', methods: 'GET')]
  public function showCategories(CategoryRepository $categoryRepository): Response {
    $categorys = $categoryRepository->findAll();
    $encoders = [new JsonEncoder()];
    $normalizers = [new ObjectNormalizer()];
    $serializer = new Serializer($normalizers, $encoders);
    $jsonContent = $serializer->serialize($categorys, "json", [
      "circular_reference_handler" => function ($object) {
        return $object->getId();
      }
    ]);
    $response = new Response($jsonContent);
    $response->headers->set("Content-Type", "application/json");
    return $response;
  }

  #[Route(path: '/read/category/{id}', name: 'read_category', methods: 'GET')]
  public function getCategory(Category $category) {
    $encoders = [new JsonEncoder()];
    $normalizers = [new ObjectNormalizer()];
    $serializer = new Serializer($normalizers, $encoders);
    $jsonContent = $serializer->serialize($category, "json", [
      "circular_reference_handler" => function ($object) {
        return $object->getId();
      }
    ]);
    $response = new Response($jsonContent);
    $response->headers->set("Content-Type", "application/json");
    return $response;
  }

  /*--------------------*\
    UPDATE
  \*--------------------*/

  #[Route(path: '/update/category/{id}', name: 'update_category', methods: 'PUT')]
  public function editCategorys(?Category $category, Request $request, ManagerRegistry $doctrine) {
    $data = json_decode($request->getContent());
    $code = 200;
    if (!$category) {
      $category = new Category();
      $code = 201;
    }
    $category->setName($data->name);
    $entityManager = $doctrine->getManager();
    $entityManager->persist($category);
    $entityManager->flush();
    return new Response("Done", $code);
  }

  /*--------------------*\
    DELETE
  \*--------------------*/

  #[Route(path: '/delete/category/{id}', name: 'delete_category', methods: 'DELETE')]
  public function deleteCategory(Category $category, ManagerRegistry $doctrine) {
    $entityManager = $doctrine->getManager();
    $entityManager->remove($category);
    $entityManager->flush();
    return new Response("Done");
  }

}

